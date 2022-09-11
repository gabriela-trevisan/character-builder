module.exports = app => {
  const units = require("../controllers/units.controller.js");

  var router = require("express").Router();

  router.get("/teste", units.teste);

  // Create a new Unit
  router.post("/create", units.create);

  // // Retrieve all Units
  router.get("/", units.findAll);

  // // Retrieve all published Units
  // router.get("/published", units.findAllPublished);

  // Retrieve a single Unit with id
  // router.get("/:id", units.findOne);

  // // Update a Unit with id
  // router.put("/:id", units.update);

  // // Delete a Unit with id
  // router.delete("/:id", units.delete);

  // // Delete all Units
  // router.delete("/", units.deleteAll);

  app.use('/api/units', router);
};
