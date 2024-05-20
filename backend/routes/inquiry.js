const inquiryController = require("../controllers/inquiryController");
const middlewareController = require("../middleware/middlewareController");

const router = require("express").Router();
// Create inquiry
router.post("/createInquiry", inquiryController.createInquiry);
// Get all inquiries
router.get("/", inquiryController.getAllInquiries);
// Get inquiry by id 
router.get("/:id", inquiryController.getInquiry);
// Update inquiry
router.put("/update/:id",middlewareController.verifyTokenAndAdminAuth, inquiryController.updateInquiry);
// Delete inquiry
router.delete("/:id",middlewareController.verifyTokenAndAdminAuth, inquiryController.deleteInquiry);

module.exports = router;
