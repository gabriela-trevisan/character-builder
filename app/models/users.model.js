const sql = require("./db.js");

// constructor
const UserUnits = function(unit) {
  this.id = unit.id;
  this.id_user = unit.id_user;
  this.id_team = unit.id_team;
  this.unit = unit.unit;
};

UserUnits.create = (newUserUnit, result) => {
  sql.query("INSERT INTO users SET ?", newUserUnit, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created unit: ", { id: res.insertId, ...newUserUnit });
    result(null, { id: res.insertId, ...newUserUnit });
  });
};

UserUnits.findById = (id, result) => {
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

    // not found Unit with the id
    result({ kind: "not_found" }, null);
  });
};

UserUnits.getAll = (name, result) => {
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

UserUnits.getAllPublished = result => {
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

UserUnits.updateById = (id, unit, result) => {
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
        // not found Unit with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated unit: ", { id: id, ...unit });
      result(null, { id: id, ...unit });
    }
  );
};

UserUnits.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Unit with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted unit with id: ", id);
    result(null, res);
  });
};

UserUnits.removeAll = result => {
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

module.exports = UserUnits;
