const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  UNAUTHORIZED_MESSAGE,
  UNAUTHORIZED_STATUS,
} = require("../utils/errors");

const {
  BAD_REQUEST_MESSAGE,
  BAD_REQUEST_STATUS,
  NOT_FOUND_MESSAGE,
  NOT_FOUND_STATUS,
  DEFAULT_MESSAGE,
  DEFAULT_STATUS,
  CONFLICT_MESSAGE,
  CONFLICT_STATUS,
  MISSING_FIELDS_MESSAGE,
} = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) =>
      res.send({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      })
    )
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_STATUS).send(BAD_REQUEST_MESSAGE);
      }
      if (err.name === "MongoServerError") {
        return res.status(CONFLICT_STATUS).send(CONFLICT_MESSAGE);
      }
      return res.status(DEFAULT_STATUS).send(DEFAULT_MESSAGE);
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
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

const updateUserInfo = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
    {
      $set: { name, avatar },
    },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_STATUS).send(NOT_FOUND_MESSAGE);
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_STATUS).send(BAD_REQUEST_MESSAGE);
      }
      return res.status(DEFAULT_STATUS).send(DEFAULT_MESSAGE);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(BAD_REQUEST_STATUS).send(MISSING_FIELDS_MESSAGE);
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return res.status(UNAUTHORIZED_STATUS).send(UNAUTHORIZED_MESSAGE);
      }
      return res.status(DEFAULT_STATUS).send(DEFAULT_MESSAGE);
    });
};

module.exports = { createUser, getCurrentUser, updateUserInfo, login };
