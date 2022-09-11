module.exports = app => {
  const teams = require("../controllers/teams.controller.js");

  var router = require("express").Router();

  // Create a new Team
  router.post("/create", teams.create);

  // Retrieve all Teams
  // router.get("/", teams.findAll);

  // // Retrieve all published Teams
  // router.get("/published", teams.findAllPublished);

  // router.get("/teste", teams.teste);

  // // Retrieve a single Team with id
  // router.get("/:id", teams.findOne);

  // // Update a Team with id
  // router.put("/:id", teams.update);

  // // Delete a Team with id
  // router.delete("/:id", teams.delete);

  // // Delete all Teams
  // router.delete("/", teams.deleteAll);

  app.use('/api/teams', router);
};
