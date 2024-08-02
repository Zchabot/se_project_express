const BadRequestError = require("../utils/Errors/BadRequestError");
const NotFoundError = require("../utils/Errors/NotFoundError");
const ClothingItem = require("../models/clothingItem");

const { BAD_REQUEST_MESSAGE, NOT_FOUND_MESSAGE } = require("../utils/errors");

const createItem = (req, res, next) => {
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
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .populate(["owner", "likes"])
    .then((items) => res.send(items))
    .catch((err) => next(err));
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(NOT_FOUND_MESSAGE));
      } else if (err.name === "CastError") {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else next(err);
    });
};

module.exports = { getItems, createItem, deleteItem };
