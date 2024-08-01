const router = require("express").Router();
const { getCurrentUser, updateUserInfo } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const {
  validateUserId,
  validateUpdatedUser,
} = require("../middlewares/validation");

router.get("/me", validateUserId, auth, getCurrentUser);
router.patch("/me", validateUpdatedUser, auth, updateUserInfo);

module.exports = router;
