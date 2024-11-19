import Slot from "../model/slotModel.js";
import Blog from "../model/blogModel.js"; 


export const createSlot = async (req, res) => {
  try {
    const { slotId, startTime, endTime, blogId } = req.body;

    if (!slotId || !startTime || !endTime || !blogId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const allSlots = await Slot.find({});
    const isOverlapping = allSlots.some((existingSlot) => {
      const { startTime: existStartTime, endTime: existEndTime } = existingSlot;
      return startTime < existEndTime && endTime > existStartTime;
    });

    if (isOverlapping) {
      return res.status(400).json({ message: "Slot overlaps with an existing slot" });
    }

    const newSlot = new Slot({
      slotId,
      startTime,
      endTime,
      blogId,
    });

    await newSlot.save();
    return res.status(201).json({ message: "Slot created successfully", newSlot });
  } catch (error) {
    console.error("Error creating slot:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getSlots = async (req, res) => {
    try {

        const slots = await Slot.find().populate("blogId");
      return res.status(200).json(slots);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  