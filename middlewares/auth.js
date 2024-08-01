const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const {
  UNAUTHORIZED_MESSAGE,
  UNAUTHORIZED_STATUS,
} = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(UNAUTHORIZED_STATUS).send({ message: UNAUTHORIZED_MESSAGE });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(UNAUTHORIZED_STATUS)
      .send({ message: UNAUTHORIZED_MESSAGE });
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
