const router = require("express").Router();
const { getCurrentUser, updateUserInfo } = require("../controllers/users");
const { auth } = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUserInfo);

module.exports = router;
