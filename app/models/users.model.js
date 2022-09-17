const sql = require("./db.js");
const bcrypt = require("bcrypt")

// constructor
const Users = function (unit) {
  this.id = unit.id;
  this.login = unit.login;
  this.email = unit.email;
  this.password = unit.password;
};

Users.create = (newUser, result) => {
  // Encrypt password
  bcrypt.hash(newUser.password, 10, function (err, hash) {
    if (err) {
      console.log("error on generate hash: ", err);
      result(err, null);
      return;
    }
    newUser.password = hash

    // TODO: Validate email

    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created unit: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });

  });
};

// Retrieve library from User @login
Users.library = (login, result) => {
  
  if(!login){
    var err = 'Missing login param';
    result(null, err);
    return;
  }
  
  /**
 * Rotas:
 * @library-units
 * @library-squads
 */
  var library_routes = {
    "library-units": "http://localhost:6868/api/users/library-units/"+login,
    "library-squads": "http://localhost:6868/api/users/library-squads/"+login
  };

  result(null, library_routes);

  /*
  let query = `SELECT * FROM users u 
                INNER JOIN user_units uu ON uu.id_user = u.id 
                INNER JOIN squad s ON s.id_user = u.id`;

  if (login) {
    query += ` WHERE u.login LIKE '${login}'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
  });
  */
};

// Retrieve library-units from User @login
Users.libraryUnits = (login, result) => {
  console.log('libraryUnits() ', login)

  if(!login){
    var err = 'Missing login param!';
    result(null, err);
    return;
  }

  let query = `SELECT uu.* FROM users u 
                INNER JOIN user_units uu ON uu.id_user = u.id 
                -- LEFT JOIN squad s ON s.id_user = u.id`;

  if (login) {
    query += ` WHERE u.login LIKE '${login}'`;
  }

  sql.query(query, (err, res) => {
    console.log('query: ', query)
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.length) {
      console.log("found units from user "+login+": ", res);
      result(null, res);
      return;
    }

    // not found Units from @login
    result({ kind: "not_found" }, null);
  });
};

// Retrieve library-squads from User @login
Users.librarySquads = (login, result) => {
  console.log('librarySquads() ', login)

  if(!login){
    var err = 'Missing login param!';
    result(null, err);
    return;
  }

  let query = `SELECT s.* FROM users u 
                -- LEFT JOIN user_units uu ON uu.id_user = u.id 
                INNER JOIN squad s ON s.id_user = u.id`;

  if (login) {
    query += ` WHERE u.login LIKE '${login}'`;
  }

  sql.query(query, (err, res) => {
    console.log('query: ', query)
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.length) {
      console.log("found squads from user "+login+": ", res);
      result(null, res);
      return;
    }

    // not found Squads from @login
    result({ kind: "not_found" }, null);
  });
};

// Users.login = (User, result) => {

// TODO: Validate email or login

// bcrypt.hash(plaintextPassword, 10, function(err, hash) {
//   // store hash in the database
// });

// De-encrypt password
// bcrypt.compare(User.password, hash, function(err, result) {
//   if (result) {
//     console.log("password is valid")
//   }
// });

// TODO: Validate password

// for (var [key, value] of Object.entries(newUser)) {
//   if(key == "password"){
//     bcrypt.hash(value, 10, function(err, hash) {
//       if (err) {
//         console.log("error on generate hash: ", err);
//         result(err, null);
//         return;
//       }
//       console.log(hash)
//       newUser['password'] = hash
//     });
//   }
// }

Users.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found unit: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Users.getAll = (name, result) => {
  let query = "SELECT * FROM users";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("unit: ", res);
    result(null, res);
  });
};

Users.getAllPublished = result => {
  sql.query("SELECT * FROM users WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("unit: ", res);
    result(null, res);
  });
};

Users.updateById = (id, unit, result) => {
  sql.query(
    "UPDATE users SET name = ?, description = ?, published = ? WHERE id = ?",
    [unit.name, unit.description, unit.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated unit: ", { id: id, ...unit });
      result(null, { id: id, ...unit });
    }
  );
};

Users.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted unit with id: ", id);
    result(null, res);
  });
};

Users.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} unit`);
    result(null, res);
  });
};

module.exports = Users;
