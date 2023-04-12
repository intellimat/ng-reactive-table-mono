const validator = require("email-validator");

const usersValidatorsMiddlewares = {
  put: (req, res, next) => {
    if (req.method === "PUT") {
      res.status(405).send("PUT method is not allowed.");
      return;
    }
    next();
  },
  post: (req, res, next) => {
    if (req.method === "POST") {
      const { name, email, department, id } = req.body;
      if (!name || name.length === 0) {
        res.status(400).send("Name " + name + " is not valid.");
        return;
      }
      if (!email || !validator.validate(email)) {
        res.status(400).send("Email " + email + " is not valid.");
        return;
      }
      if (!department || department.length === 0) {
        res.status(400).send("Department " + department + " is not valid.");
        return;
      }
      if (id) {
        res
          .status(400)
          .send(
            "You cannot assign an id. Id will be assigned automatically by the server. \n Remove id property from body."
          );
        return;
      }

      // Sanitize and call next handler
      req.body = {
        name,
        email,
        department,
      };
    }
    next();
  },
  patch: (req, res, next) => {
    if (req.method === "PATCH") {
      const { name, email, department } = req.body;

      if (name && name.length === 0) {
        res.status(400).send("Name " + name + " is not valid.");
        return;
      }
      if (email && !validator.validate(email)) {
        res.status(400).send("Email " + email + " is not valid.");
        return;
      }
      if (department && department.length === 0) {
        res.status(400).send("Department " + department + " is not valid.");
        return;
      }

      // Sanitize and call next handler
      req.body = {
        name,
        email,
        department,
      };
    }
    next();
  },
};

module.exports = usersValidatorsMiddlewares;
