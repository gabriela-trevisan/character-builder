module.exports = app => {
  const squad = require("../controllers/squad.controller.js");

  var router = require("express").Router();

  // Create a new Squad
  router.post("/create", squad.create);

  // Retrieve all Squad
  // router.get("/", squad.findAll);

  // // Retrieve all published Squad
  // router.get("/published", squad.findAllPublished);

  // router.get("/teste", squad.teste);

  // // Retrieve a single Squad with id
  // router.get("/:id", squad.findOne);

  // // Update a Squad with id
  // router.put("/:id", squad.update);

  // // Delete a Squad with id
  // router.delete("/:id", squad.delete);

  // // Delete all Squad
  // router.delete("/", squad.deleteAll);

  app.use('/api/squad', router);
};
