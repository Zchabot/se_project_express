const BAD_REQUEST_MESSAGE = {
  message:
    "invalid data passed to the methods for creating an item/user or updating an item/user, or invalid ID passed to the params.",
};

const NOT_FOUND_MESSAGE = { message: "Requested resource not found" };

const DEFAULT_MESSAGE = {
  message: "An error has occurred on the server.",
};

const BAD_REQUEST_STATUS = 400;

const NOT_FOUND_STATUS = 404;

const DEFAULT_STATUS = 500;

module.exports = {
  BAD_REQUEST_MESSAGE,
  BAD_REQUEST_STATUS,
  NOT_FOUND_MESSAGE,
  NOT_FOUND_STATUS,
  DEFAULT_MESSAGE,
  DEFAULT_STATUS,
};
