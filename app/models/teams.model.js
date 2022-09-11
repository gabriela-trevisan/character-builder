const sql = require("./db.js");
const PointsCalculator = require("./points-calculator.model.js");

// constructor
const Teams = function(team) {
  this.id = team.id;
  this.id_user = team.id_user;
  this.name = team.name;
  this.units = team.units;
  this.total_points = team.total_points;
  this.used_points = team.used_points;
};

Teams.create = (newTeam, result) => {
  console.log("CREATE()")
  console.log(newTeam)
  // console.log(result)
  // console.log(Object.entries(newTeam))
  // TODO: validar os campos obrigatorios

  // Calcula os pontos
  let TeamPointsCalculated = PointsCalculator.unitsTotalCost(newTeam)
  console.log("##### Retorno objeto:")
  console.log(TeamPointsCalculated)
  
  newTeam = TeamPointsCalculated

  var json_units = "{}";
  // Seta json validado no objeto
  json_units = JSON.stringify(TeamPointsCalculated['units'])
  // console.log("json units: ", json)
  newTeam['units'] = json_units

  sql.query("INSERT INTO teams SET ?", newTeam, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    // console.log(res)
    console.log("created team: ", { id: res.insertId, ...newTeam });
    newTeam.id = res.insertId;
    result(null, { id: res.insertId, ...newTeam });
  });
};

Teams.findById = (id, result) => {
  sql.query(`SELECT * FROM teams WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found team: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Team with the id
    result({ kind: "not_found" }, null);
  });
};

Teams.getAll = (title, result) => {
  let query = "SELECT * FROM teams";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("teams: ", res);
    result(null, res);
  });
};

Teams.getAllPublished = result => {
  sql.query("SELECT * FROM teams WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("teams: ", res);
    result(null, res);
  });
};

Teams.updateById = (id, team, result) => {
  sql.query(
    "UPDATE teams SET title = ?, description = ?, published = ? WHERE id = ?",
    [team.title, team.description, team.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Team with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated team: ", { id: id, ...team });
      result(null, { id: id, ...team });
    }
  );
};

Teams.remove = (id, result) => {
  sql.query("DELETE FROM teams WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Team with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted team with id: ", id);
    result(null, res);
  });
};

Teams.removeAll = result => {
  sql.query("DELETE FROM teams", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} teams`);
    result(null, res);
  });
};

module.exports = Teams;
