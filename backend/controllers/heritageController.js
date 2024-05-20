const Heritage = require("../models/Heritage");
const User = require("../models/User");
const xml2js = require("xml2js");
const heritageController = {
  // Create Heritage
  createHeritage: async (req, res) => {
    try {
      const {
        name,
        province_name,
        region,
        address,
        category,
        type,
        content,
        image_link,
        video_link,
        map_diagram,
        source,
      } = req.body;
      // Create new Heritage
      const newHeritage = new Heritage({
        name,
        province_name,
        region,
        address,
        category,
        type,
        content,
        image_link,
        video_link,
        map_diagram,
        source,
        author: req.user.id,
      });
      const heritage = await newHeritage.save();
      res.status(200).json(heritage);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // Get all heritages
  getAllHeritages: async (req, res) => {
    try {
      const heritage = await Heritage.find().sort({ createdAt: -1 });
      res.status(200).json(heritage);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get heritage by ID
  getHeritage: async (req, res) => {
    try {
      const heritage = await Heritage.findById(req.params.id);
      res.status(200).json(heritage);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get XML heritage by ID
  getXMLHeritage: async (req, res) => {
    try {
      const heritage = await Heritage.findById(req.params.id);
      const xmlObject = {
        note: {
          name: heritage.name,
          location: heritage.address,
          content: {
            attr: heritage.content.map((content) => ({
              _: content.description,
              $: {
                name: content.name,
              },
            })),
          },
          source: heritage.source,
          img: heritage.image_link,
          video: heritage.video_link,
        },
      };
      const builder = new xml2js.Builder();
      const xml = builder.buildObject(xmlObject);
      res.set("Content-Type", "text/xml");
      res.send(xml);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // Update heritage
  updateHeritage: async (req, res) => {
    try {
      // Validate heritage ID
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Invalid heritage ID" });
      }
      const {
        name,
        province_name,
        region,
        address,
        category,
        type,
        content,
        image_link,
        video_link,
        map_diagram,
        source,
        status,
      } = req.body;
      const updateData = {};
      updateData.name = name;
      updateData.province_name = province_name;
      updateData.region = region;
      updateData.address = address;
      updateData.category = category;
      updateData.type = type;
      updateData.content = content;
      updateData.image_link = image_link;
      updateData.video_link = video_link;
      updateData.map_diagram = map_diagram;
      updateData.source = source;
      if (status) {
        if (req.user.isAdmin) {
          updateData.status = status;
        } else {
          return res.status(403).json("Only admin can edit status");
        }
      }

      // Update user in the database
      const updatedHeritage = await Heritage.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
      // Check if the user was found and updated
      if (!updatedHeritage) {
        return res.status(404).json({ message: "Heritage not found" });
      }
      res.status(200).json(updatedHeritage);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // Add more content to heritage
  addContent: async (req, res) => {
    try {
      const { name, description } = req.body;
      const addContent = {};
      addContent.name = name;
      addContent.description = description;
      const heritage = await Heritage.findById(req.params.id);
      if (!addContent || !addContent.name || !addContent.description) {
        return res
          .status(400)
          .json("Missing required content properties (name, description)");
      }
      // Check if the heritage exists before accessing properties
      if (!heritage) {
        return res.status(404).json("Heritage not found!");
      }
      // Add heritage ID to user's interest list
      heritage.content.push(addContent);
      const updatedHeritage = await heritage.save();
      res.status(200).json("Add content successfully");
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // Delete heritage
  deleteHeritage: async (req, res) => {
    try {
      const heritage = await Heritage.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successful!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add interest heritage ID to list
  addHeritageToUserInterest: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      // Add heritage ID to user's interest list
      user.interest_heritage.push(req.params.id);
      const updatedUser = await user.save();
      res.status(200).json("Add heritage to favourite successful!");
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // Remove heritage ID from user interest list
  removeHeritageFromUserInterest: async (req, res) => {
    try {
      // Remove heritage ID from user's interest list
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $pull: { interest_heritage: req.params.id } }, // Use $pull operator
        { new: true }
      );
      res.status(200).json("Remove heritage from favourite successful!");
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
};

module.exports = heritageController;
