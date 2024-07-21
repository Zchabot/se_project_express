const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const likesRouter = require("./likes");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.use("/items", likesRouter);

module.exports = router;
