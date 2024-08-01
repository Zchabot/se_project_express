const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST_MESSAGE,
  BAD_REQUEST_STATUS,
  NOT_FOUND_MESSAGE,
  NOT_FOUND_STATUS,
  DEFAULT_MESSAGE,
  DEFAULT_STATUS,
  FORBIDDEN_MESSAGE,
  FORBIDDEN_STATUS,
} = require("../utils/errors");

const checkOwner = (req, res, next) => {
  const { itemId } = req.params;
  const ownerId = req.user._id;
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      const itemOwner = item.owner._id.toString();
      if (itemOwner === ownerId) {
        return next();
      }
      return res.status(FORBIDDEN_STATUS).send({ message: FORBIDDEN_MESSAGE });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_STATUS)
          .send({ message: NOT_FOUND_MESSAGE });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_STATUS)
          .send({ message: BAD_REQUEST_MESSAGE });
      }
      return res.status(DEFAULT_STATUS).send({ message: DEFAULT_MESSAGE });
    });
};

module.exports = { checkOwner };
