const sql = require("./db.js");
const PointsCalculator = require("./points-calculator.model.js");

// constructor
const Squad = function(squad) {
  this.id = squad.id;
  this.id_user = squad.id_user;
  this.name = squad.name;
  this.units = squad.units;
  this.total_points = squad.total_points;
  this.used_points = squad.used_points;
};

Squad.create = (newTeam, result) => {
  console.log("CREATE()")
  console.log(newTeam)
  // console.log(result)
  // console.log(Object.entries(newTeam))
  // TODO: validar os campos obrigatorios

  // Calcula os pontos
  let SquadTotalCost = PointsCalculator.squadTotalCost(newTeam)
  console.log("##### Retorno objeto:")
  console.log(SquadTotalCost)
  
  newTeam = SquadTotalCost

  var json_units = "{}";
  // Seta json validado no objeto
  json_units = JSON.stringify(SquadTotalCost['units'])
  // console.log("json units: ", json)
  newTeam['units'] = json_units

  sql.query("INSERT INTO squad SET ?", newTeam, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    // console.log(res)
    console.log("created squad: ", { id: res.insertId, ...newTeam });
    newTeam.id = res.insertId;
    result(null, { id: res.insertId, ...newTeam });
  });
};

Squad.findById = (id, result) => {
  sql.query(`SELECT * FROM squad WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found squad: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Squad with the id
    result({ kind: "not_found" }, null);
  });
};

Squad.getAll = (title, result) => {
  let query = "SELECT * FROM squad";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("squad: ", res);
    result(null, res);
  });
};

Squad.getAllPublished = result => {
  sql.query("SELECT * FROM squad WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("squad: ", res);
    result(null, res);
  });
};

Squad.updateById = (id, squad, result) => {
  sql.query(
    "UPDATE squad SET title = ?, description = ?, published = ? WHERE id = ?",
    [squad.title, squad.description, squad.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Squad with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated squad: ", { id: id, ...squad });
      result(null, { id: id, ...squad });
    }
  );
};

Squad.remove = (id, result) => {
  sql.query("DELETE FROM squad WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Squad with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted squad with id: ", id);
    result(null, res);
  });
};

Squad.removeAll = result => {
  sql.query("DELETE FROM squad", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} squad`);
    result(null, res);
  });
};

module.exports = Squad;
