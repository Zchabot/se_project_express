const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");
const { auth } = require("../middlewares/auth");
const { checkOwner } = require("../middlewares/checkOwner");

router.post("/", auth, createItem);
router.get("/", getItems);
router.delete("/:itemId", auth, checkOwner, deleteItem);

module.exports = router;
