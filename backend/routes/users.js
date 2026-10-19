const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { authenticate, adminOnly } = require("../middleware/authMiddleware");

router.get("/", authenticate, adminOnly, authController.getUsers);
router.get("/:id", authenticate, adminOnly, authController.getUserById);
router.post("/", authenticate, adminOnly, authController.createUser);
router.put("/:id", authenticate, adminOnly, authController.updateUser);
router.delete("/:id", authenticate, adminOnly, authController.deleteUser);

module.exports = router;
