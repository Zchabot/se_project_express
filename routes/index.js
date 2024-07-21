const router = require("express").Router();
const { NOT_FOUND_MESSAGE, NOT_FOUND_STATUS } = require("../utils/errors");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const likesRouter = require("./likes");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.use("/items", likesRouter);
router.use("*", (req, res) => {
  return res.status(NOT_FOUND_STATUS).send(NOT_FOUND_MESSAGE);
});

module.exports = router;
