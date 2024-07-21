const ClothingItem = require("../models/clothingItem");

const {
  BAD_REQUEST_MESSAGE,
  BAD_REQUEST_STATUS,
  NOT_FOUND_MESSAGE,
  NOT_FOUND_STATUS,
  DEFAULT_MESSAGE,
  DEFAULT_STATUS,
} = require("../utils/errors");

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
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

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
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

module.exports = { likeItem, dislikeItem };
