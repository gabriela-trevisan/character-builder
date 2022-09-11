module.exports = app => {
  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();

  router.get("/teste", users.teste);

  // Create a new Tutorial
  // router.post("/create", users.create);

  // // // Retrieve all Tutorials
  // router.get("/", users.findAll);

  // // Retrieve all published Tutorials
  // router.get("/published", users.findAllPublished);

  // Retrieve a single Tutorial with id
  // router.get("/:id", users.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", users.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", users.delete);

  // // Delete all Tutorials
  // router.delete("/", users.deleteAll);

  app.use('/api/users', router);
};
