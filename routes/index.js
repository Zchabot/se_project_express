const router = require("express").Router();
const { NOT_FOUND_MESSAGE, NOT_FOUND_STATUS } = require("../utils/errors");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const likesRouter = require("./likes");
const { createUser, login } = require("../controllers/users");
const {
  validateUserInfo,
  validateAuthUser,
} = require("../middlewares/validation");

router.post("/signin", validateAuthUser, login);
router.post("/signup", validateUserInfo, createUser);
router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.use("/items", likesRouter);
router.use("*", (req, res) => {
  res.status(NOT_FOUND_STATUS).send(NOT_FOUND_MESSAGE);
});

module.exports = router;
