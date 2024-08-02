const router = require("express").Router();
const { getCurrentUser, updateUserInfo } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { validateUpdatedUser } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUpdatedUser, updateUserInfo);

module.exports = router;
