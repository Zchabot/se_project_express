const ClothingItem = require("../models/clothingItem");

const { error400, error404, error500 } = require("../utils/errors");

const createItem = (req, res) => {
  const ownerId = req.user._id;
  const { name, weather, imageUrl, likes: likesId, createdAt } = req.body;
  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: ownerId,
    likes: likesId,
    createdAt,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send(error400);
      }
      return res.status(500).send(error500);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .populate(["owner", "likes", "createdAt"])
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(500).send(error500);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send(error404);
      }
      if (err.name === "CastError") {
        return res.status(400).send(error400);
      }
      return res.status(500).send(error500);
    });
};

module.exports = { getItems, createItem, deleteItem };
