const BAD_REQUEST_MESSAGE = {
  message:
    "invalid data passed to the methods for creating an item/user or updating an item/user, or invalid ID passed to the params.",
};

const NOT_FOUND_MESSAGE = { message: "Requested resource not found" };

const DEFAULT_MESSAGE = { message: "An error has occurred on the server." };

const UNAUTHORIZED_MESSAGE = { message: "Authorization Required" };

const FORBIDDEN_MESSAGE = {
  message: "Authorization required to perform this action",
};

const CONFLICT_MESSAGE = {
  message: "An account already exists for this email address",
};

const MISSING_FIELDS_MESSAGE = {
  message: "The email and password fields are required",
};

const UNAUTHORIZED_STATUS = 401;

const BAD_REQUEST_STATUS = 400;

const NOT_FOUND_STATUS = 404;

const DEFAULT_STATUS = 500;

const FORBIDDEN_STATUS = 403;

const CONFLICT_STATUS = 409;

module.exports = {
  BAD_REQUEST_MESSAGE,
  BAD_REQUEST_STATUS,
  NOT_FOUND_MESSAGE,
  NOT_FOUND_STATUS,
  DEFAULT_MESSAGE,
  DEFAULT_STATUS,
  UNAUTHORIZED_MESSAGE,
  UNAUTHORIZED_STATUS,
  FORBIDDEN_STATUS,
  FORBIDDEN_MESSAGE,
  CONFLICT_MESSAGE,
  CONFLICT_STATUS,
  MISSING_FIELDS_MESSAGE,
};
