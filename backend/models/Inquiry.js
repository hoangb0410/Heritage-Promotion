const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, max: 50},
    email: { type: String, required: true },
    subject: { type: String, required: true, max: 50},
    content: { type: String, required: true, max:1000 },
    status: {
      type: String, 
      enum: ['pending', 'viewed'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
