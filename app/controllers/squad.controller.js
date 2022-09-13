const Squad = require("../models/squad.model.js");

// Create and Save a new Squad
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Squad
  const squad = new Squad({
    id_user: req.body.id_user,
    name: req.body.name,
    units: req.body.units || false,
    total_points: req.body.total_points || 0,
    used_points: req.body.used_points || 0
  });

  // Save Squad in the database
  Squad.create(squad, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Squad."
      });
    else res.send(data);
  });
};

// Retrieve all Squad from the database (with condition).
// exports.findAll = (req, res) => {
//   const title = req.query.title;

//   Squad.getAll(title, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     else res.send(data);
//   });
// };

// // Find a single Squad by Id
// exports.findOne = (req, res) => {
//   Squad.findById(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Squad with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving Squad with id " + req.params.id
//         });
//       }
//     } else res.send(data);
//   });
// };

// // find all published Squad
// exports.findAllPublished = (req, res) => {
//   Squad.getAllPublished((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     else res.send(data);
//   });
// };

// // Update a Squad identified by the id in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   console.log(req.body);

//   Squad.updateById(
//     req.params.id,
//     new Squad(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found Squad with id ${req.params.id}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating Squad with id " + req.params.id
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };

// // Delete a Squad with the specified id in the request
// exports.delete = (req, res) => {
//   Squad.remove(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Squad with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not delete Squad with id " + req.params.id
//         });
//       }
//     } else res.send({ message: `Squad was deleted successfully!` });
//   });
// };

// // Delete all Squad from the database.
// exports.deleteAll = (req, res) => {
//   Squad.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     else res.send({ message: `All Squad were deleted successfully!` });
//   });
// };

// new
exports.teste = (req, res) => {
  res.send({ message: `Teste!` })
};
