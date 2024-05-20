const heritageController = require("../controllers/heritageController");
const middlewareController = require("../middleware/middlewareController");

const router = require("express").Router();
// Create historical heritage
router.post(
  "/createHeritage",
  middlewareController.verifyToken,
  heritageController.createHeritage
);
// Get all heritages
router.get("/", heritageController.getAllHeritages);
// Get heritage by ID
router.get("/:id", heritageController.getHeritage);
// Get XML heritage by ID
router.get("/XML/:id", heritageController.getXMLHeritage);
// Update heritage
router.put(
  "/update/:id",
  middlewareController.verifyTokenAndAuthorOrAdminHeritage,
  heritageController.updateHeritage
);
// Add more content
router.put(
  "/addContent/:id",
  middlewareController.verifyTokenAndAuthorOrAdminHeritage,
  heritageController.addContent
);
// Delete heritage
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAuthorOrAdminHeritage,
  heritageController.deleteHeritage
);
// Add Heritage to favourite
router.post(
  "/addToInterest/:id",
  middlewareController.verifyToken,
  heritageController.addHeritageToUserInterest
);
// Remove heritage from interestlist
router.post(
  "/removeFromInterest/:id",
  middlewareController.verifyToken,
  heritageController.removeHeritageFromUserInterest
);

module.exports = router;
