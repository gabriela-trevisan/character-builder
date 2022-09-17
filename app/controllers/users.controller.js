const Users = require("../models/users.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const unit = new Users({
    login: req.body.login,
    email: req.body.email,
    password: req.body.password
  });

  // Save User in the database
  Users.create(unit, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    else res.send(data);
    // res.send('Testeeeee');
  });
};

// // Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Users.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

// // Find a single User by Id
// exports.findOne = (req, res) => {
//   Users.findById(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found User with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving User with id " + req.params.id
//         });
//       }
//     } else res.send(data);
//   });
// };

// // find all published Users
// exports.findAllPublished = (req, res) => {
//   Users.getAllPublished((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving users."
//       });
//     else res.send(data);
//   });
// };

// // Update a User identified by the id in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   console.log(req.body);

//   Users.updateById(
//     req.params.id,
//     new User(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found User with id ${req.params.id}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating User with id " + req.params.id
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };

// // Delete a User with the specified id in the request
// exports.delete = (req, res) => {
//   Users.remove(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found User with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not delete User with id " + req.params.id
//         });
//       }
//     } else res.send({ message: `User was deleted successfully!` });
//   });
// };

// // Delete all Users from the database.
// exports.deleteAll = (req, res) => {
//   Users.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all users."
//       });
//     else res.send({ message: `All Users were deleted successfully!` });
//   });
// };