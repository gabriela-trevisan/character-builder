module.exports = app => {
  const units = require("../controllers/units.controller.js");

  var router = require("express").Router();

  router.get("/teste", units.teste);

  // Create a new Tutorial
  router.post("/create", units.create);

  // // Retrieve all Tutorials
  router.get("/", units.findAll);

  // // Retrieve all published Tutorials
  // router.get("/published", units.findAllPublished);

  // Retrieve a single Tutorial with id
  // router.get("/:id", units.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", units.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", units.delete);

  // // Delete all Tutorials
  // router.delete("/", units.deleteAll);

  app.use('/api/units', router);
};
