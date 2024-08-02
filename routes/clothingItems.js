const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");
const { auth } = require("../middlewares/auth");
const { checkOwner } = require("../middlewares/checkOwner");
const {
  validateCardBody,
  validateItemId,
} = require("../middlewares/validation");

router.post("/", auth, validateCardBody, createItem);
router.get("/", getItems);
router.delete("/:itemId", auth, validateItemId, checkOwner, deleteItem);

module.exports = router;
