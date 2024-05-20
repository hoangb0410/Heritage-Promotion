const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    event_name: { type: String, required: true, max: 100, unique: true },
    event_date: { type: Date, required: true },
    content: { type: String, required: true, max: 1000 },
    image_link: { type: String, required: true },
    video_link: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    heritage: { type: mongoose.Schema.Types.ObjectId, ref: "Heritage" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
