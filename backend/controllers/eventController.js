const Event = require("../models/Event");
const User = require("../models/User");

const eventController = {
  // Create Event
  createEvent: async (req, res) => {
    try {
      const {
        event_name,
        event_date,
        content,
        image_link,
        video_link,
        heritage,
      } = req.body;
      // Create new event
      const newEvent = new Event({
        event_name,
        event_date,
        content,
        image_link,
        video_link,
        author: req.user.id,
        heritage,
      });
      const event = await newEvent.save();
      res.status(200).json(event);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // Get all events
  getAllEvents: async (req, res) => {
    try {
      const event = await Event.find().sort({ createdAt: -1 });
      res.status(200).json(event);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get event by ID
  getEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      res.status(200).json(event);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update event
  updateEvent: async (req, res) => {
    try {
      // Validate event ID
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Invalid event ID" });
      }
      const {
        event_name,
        event_date,
        content,
        image_link,
        video_link,
        heritage,
        status,
      } = req.body;
      const updateData = {};
      updateData.event_name = event_name;
      updateData.event_date = event_date;
      updateData.image_link = image_link;
      updateData.video_link = video_link;
      updateData.content = content;
      updateData.heritage = heritage;
      if (status) {
        if (req.user.isAdmin) {
          updateData.status = status;
        } else {
          return res.status(403).json("Only admin can edit status");
        }
      }
      // Update event in the database
      const updatedEvent = await Event.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
      // Check if the event was found and updated
      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.status(200).json(updatedEvent);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // Delete event
  deleteEvent: async (req, res) => {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successful!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add interest event ID to list
  addEventToUserInterest: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      // Add event ID to user's interest list
      user.interest_event.push(req.params.id);
      const updatedUser = await user.save();
      res.status(200).json("Add event to favourite successful!");
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // Remove event ID from user interest list
  removeHeritageFromUserInterest: async (req, res) => {
    try {
      // Remove event ID from user's interest list
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $pull: { interest_event: req.params.id } }, // Use $pull operator
        { new: true }
      );
      res.status(200).json("Remove heritage from favourite successful!");
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
};

module.exports = eventController;
