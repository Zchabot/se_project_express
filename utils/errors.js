const error400 = {
  message:
    "invalid data passed to the methods for creating an item/user or updating an item/user, or invalid ID passed to the params.",
};

const error404 = { message: "Requested resource not found" };

const error500 = { message: "An error has occurred on the server." };

module.exports = { error400, error404, error500 };
