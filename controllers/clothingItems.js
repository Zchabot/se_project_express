const ClothingItem = require("../models/clothingItem");

const {
  BAD_REQUEST_MESSAGE,
  BAD_REQUEST_STATUS,
  NOT_FOUND_MESSAGE,
  NOT_FOUND_STATUS,
  DEFAULT_MESSAGE,
  DEFAULT_STATUS,
} = require("../utils/errors");

const createItem = (req, res) => {
  const ownerId = req.user._id;
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: ownerId,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_STATUS).send(BAD_REQUEST_MESSAGE);
      }
      return res.status(DEFAULT_STATUS).send(DEFAULT_MESSAGE);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .orFail()
    .populate(["owner", "likes", "createdAt"])
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_STATUS).send(NOT_FOUND_MESSAGE);
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_STATUS).send(BAD_REQUEST_MESSAGE);
      }
      return res.status(DEFAULT_STATUS).send(DEFAULT_MESSAGE);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_STATUS).send(NOT_FOUND_MESSAGE);
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_STATUS).send(BAD_REQUEST_MESSAGE);
      }
      return res.status(DEFAULT_STATUS).send(DEFAULT_MESSAGE);
    });
};

module.exports = { getItems, createItem, deleteItem };
