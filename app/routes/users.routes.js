module.exports = app => {
  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();

  // router.get("/teste", users.teste);

  // Create a new User
  router.post("/create", users.create);

  // Retrieve library of the user
  // router.get("/library", users.library);
  router.get("/library-units", users.libraryUnits);
  router.get("/library-squads", users.librarySquads);
  router.get("/library", users.library);

  // // Retrieve all published Users
  // router.get("/published", users.findAllPublished);

  // Retrieve a single User with id
  // router.get("/:id", users.findOne);

  // // Update a User with id
  // router.put("/:id", users.update);

  // // Delete a User with id
  // router.delete("/:id", users.delete);

  // // Delete all Users
  // router.delete("/", users.deleteAll);

  app.use('/api/users', router);
};
