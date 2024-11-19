import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  slotId: {
    type: String,
    required: true,
    unique: true,
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Blog",
    required:true
  }
});

const Slot = mongoose.model('Slot', SlotSchema);
export default Slot;
