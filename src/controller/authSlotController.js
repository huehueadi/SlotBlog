import moment from "moment-timezone";
import geoip from "geoip-lite";
import Slot from "../models/Slot.js";

export const createSlot = async (req, res) => {
  try {
    const { startTime, endTime, blogId } = req.body;
    const { userName } = req.user;

    if (!startTime || !endTime || !blogId) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }


    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const geo = geoip.lookup(ip);

    if (!geo || !geo.timezone) {
      return res.status(400).json({ message: "Could not determine time zone", success: false });
    }

    const userTimeZone = geo.timezone; 

    const startTimeUTC = moment.tz(startTime, userTimeZone).utc().toISOString();
    const endTimeUTC = moment.tz(endTime, userTimeZone).utc().toISOString();


    const existingSlotsForBlog = await Slot.find({ blogId });

    const isOverlapping = existingSlotsForBlog.some((existingSlot) => {
      const existStartTime = moment(existingSlot.startTime).utc().toISOString();
      const existEndTime = moment(existingSlot.endTime).utc().toISOString();

      return startTimeUTC < existEndTime && endTimeUTC > existStartTime;
    });

    if (isOverlapping) {
      return res.status(400).json({
        message: "Slot overlaps with an existing slot for this blog",
        success: false,
      });
    }


    const newSlot = new Slot({
      userName,
      startTime: startTimeUTC,
      endTime: endTimeUTC,
      blogId,
    });

    await newSlot.save();

    return res.status(201).json({
      message: "Slot created successfully",
      success: true,
      newSlot,
    });

  } catch (error) {
    console.error("Error creating slot:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


export const getSlots = async (req, res) => {
  try {
    const currentTime = moment().toDate();

    const slots = await Slot.find().populate("blogId");

    const nonExpiredSlots = slots.filter((slot) => {
      const slotEndTime = moment(slot.endTime).toDate();
      return slotEndTime > currentTime;
    });

    return res.status(200).json({
      message: "Slots fetched successfully",
      success: true,
      slots: nonExpiredSlots,
    });

  } catch (error) {
    console.error("Error fetching slots:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
