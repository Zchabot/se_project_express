const ClothingItem = require("../models/clothingItem");
const BadRequestError = require("../utils/Errors/BadRequestError");
const NotFoundError = require("../utils/Errors/NotFoundError");

const { BAD_REQUEST_MESSAGE, NOT_FOUND_MESSAGE } = require("../utils/errors");

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(NOT_FOUND_MESSAGE));
      } else if (err.name === "CastError") {
        next(new (BadRequestError(BAD_REQUEST_MESSAGE))());
      } else {
        next(err);
      }
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(NOT_FOUND_MESSAGE));
      } else if (err.name === "CastError") {
        next(new (BadRequestError(BAD_REQUEST_MESSAGE))());
      } else {
        next(err);
      }
    });
};

module.exports = { likeItem, dislikeItem };
