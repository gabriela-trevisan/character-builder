const sql = require("./db.js");

// constructor
const Units = function(unit) {
  this.id = unit.id;
  this.name = unit.name;
  this.type = unit.type;
  this.quality = unit.quality;
  this.defense = unit.defense;
  this.weapons = unit.weapons;
  this.special_rules = unit.special_rules;
  this.base_cost = unit.base_cost;
  this.total_cost = unit.total_cost;
};

Units.create = (newUnit, result) => {
  sql.query("INSERT INTO units SET ?", newUnit, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created unit: ", { id: res.insertId, ...newUnit });
    result(null, { id: res.insertId, ...newUnit });
  });
};

Units.findById = (id, result) => {
  sql.query(`SELECT * FROM units WHERE id = ${id}`, (err, res) => {
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

Units.getAll = (name, result) => {
  let query = "SELECT * FROM units";

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

Units.getAllPublished = result => {
  sql.query("SELECT * FROM units WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("unit: ", res);
    result(null, res);
  });
};

Units.updateById = (id, unit, result) => {
  sql.query(
    "UPDATE units SET name = ?, description = ?, published = ? WHERE id = ?",
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

Units.remove = (id, result) => {
  sql.query("DELETE FROM units WHERE id = ?", id, (err, res) => {
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

Units.removeAll = result => {
  sql.query("DELETE FROM units", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} unit`);
    result(null, res);
  });
};

module.exports = Units;
