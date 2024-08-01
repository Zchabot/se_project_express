const { BAD_REQUEST_MESSAGE } = require("../errors");

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
