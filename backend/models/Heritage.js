const mongoose = require("mongoose");

const heritageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, max: 50, unique: true },
    province_name: { type: String, required: true, max: 50 },
    region: { type: String, required: true, min: 6 },
    address: { type: String, max: 80 },
    category: {
      type: String,
      enum: ["tangible", "intangible"],
    },
    type: {
      type: String,
      enum: [
        "scenic spots",
        "historical sites",
        "arts",
        "festivals",
        "customs and beliefs",
        "spoken and written language",
        "crafts",
        "folk knowledge",
      ],
    },
    content: [
      {
        name: { type: String, required: true, max: 80 },
        description: { type: String, required: true, max: 10000 },
      },
    ],
    image_link: { type: String, required: true },
    video_link: { type: String },
    map_diagram: { type: String, max: 80 },
    source: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Heritage", heritageSchema);
