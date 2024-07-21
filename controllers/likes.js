const ClothingItem = require("../models/clothingItem");

const { error400, error404, error500 } = require("../utils/errors");

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
        return res.status(404).send(error404);
      } else if (err.name === "CastError") {
        return res.status(400).send(error400);
      }
      return res.status(500).send(error500);
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
        return res.status(404).send(error404);
      } else if (err.name === "CastError") {
        return res.status(400).send(error400);
      }
      return res.status(500).send(error500);
    });
};

module.exports = { likeItem, dislikeItem };
