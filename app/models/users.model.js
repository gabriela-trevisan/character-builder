const sql = require("./db.js");

// constructor
const Users = function(unit) {
  this.id = unit.id;
  this.id_user = unit.id_user;
  this.id_team = unit.id_team;
  this.unit = unit.unit;
};

Users.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created unit: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

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
