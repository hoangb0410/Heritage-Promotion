const eventController = require("../controllers/eventController");
const middlewareController = require("../middleware/middlewareController");

const router = require("express").Router();
// Create event
router.post(
  "/createEvent",
  middlewareController.verifyToken,
  eventController.createEvent
);
// Get all events
router.get("/", eventController.getAllEvents);
// Get event by ID
router.get("/:id", eventController.getEvent);
// Update event
router.put(
  "/update/:id",
  middlewareController.verifyTokenAndAuthorOrAdminEvent,
  eventController.updateEvent
);
// Delete event
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAuthorOrAdminEvent,
  eventController.deleteEvent
);
// Add event to favourite
router.post(
  "/addToInterest/:id",
  middlewareController.verifyToken,
  eventController.addEventToUserInterest
);
// Remove event from favourite
router.post(
  "/removeFromInterest/:id",
  middlewareController.verifyToken,
  eventController.removeHeritageFromUserInterest
);
module.exports = router;
