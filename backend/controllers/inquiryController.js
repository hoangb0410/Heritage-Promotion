const Inquiry = require("../models/Inquiry");

const inquiryController = {
  // Create Inquiry
  createInquiry: async (req, res) => {
    try {
      const { name, email, subject, content } = req.body;
      // Create new Inquiry
      const newInquiry = new Inquiry({
        name,
        email,
        subject,
        content,
      });
      const inquiry = await newInquiry.save();
      res.status(200).json(inquiry);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // Get all inquiries
  getAllInquiries: async (req, res) => {
    try {
      const inquiry = await Inquiry.find().sort({ createdAt: -1 });
      res.status(200).json(inquiry);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get inquiry by ID
  getInquiry: async (req, res) => {
    try {
      const inquiry = await Inquiry.findById(req.params.id);
      res.status(200).json(inquiry);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update inquiry
  updateInquiry: async (req, res) => {
    try {
      // Validate inquiry ID
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Invalid inquiry ID" });
      }
      const updateData = req.body;
      // Update inquiry in the database
      const updatedInquiry = await Inquiry.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
      // Check if the inquiry was found and updated
      if (!updatedInquiry) {
        return res.status(404).json({ message: "Inquiry not found" });
      }
      res.status(200).json(updatedInquiry);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // Delete inquiry
  deleteInquiry: async (req, res) => {
    try {
      const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successful!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = inquiryController;
