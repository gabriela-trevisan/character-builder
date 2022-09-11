const sql = require("./db.js");

// constructor
const PointsCalculator = function(points) {
  this.base_cost = points.base_cost;
  this.total = points.total;
};

// PointsCalculator.unitsTotalCost = (values, result) => {
//   console.log('****** PointsCalculator.unitsTotalCost() ', values)
//     let total_cost = 0;
//     for (let i = 0; i < values.length; i++) {
//       total_cost += values[i].base_cost;
//       // console.log(total_cost)
//     }
//     return total_cost;
// };

PointsCalculator.unitsTotalCost = (Obj, result) => {
  console.log('****** PointsCalculator.unitsTotalCost() ', Obj)
  let total_cost = 0;

  for (var [key, unit] of Object.entries(Obj.units)) {
    // console.log(key + ': ' + unit);
    for (var [key_unit, val_unit] of Object.entries(unit)) {
      // console.log(key_unit + ': ' + val_unit);
      let base_cost = 0;
      if(key_unit == 'weapons'){
        // Custo Weapons
        console.log('Weapons:')
        for (var [key_weapon, val_weapon] of Object.entries(val_unit)) {
          console.log(key_weapon, ": ", val_weapon)
          total_cost += val_weapon.base_cost
        }
      }else if(key_unit == 'special_rules'){
        // Custo Special Rules
        console.log('Special Rules:')
        for (var [key_sr, val_sr] of Object.entries(val_unit)) {
          console.log(key_sr, ": ", val_sr)
          total_cost += val_sr.base_cost
        }
      }else if(key_unit == 'base_cost'){
        // Custo base
        base_cost += val_unit
        console.log("Custo base:", base_cost)
        total_cost += base_cost;
        console.log("Total Cost: ", total_cost)
      }
    }
    // Seta o total do custo para as unidades
    Obj.units.total_cost = total_cost;
  }
  // Seta o total de pontos usados no team
  Obj['used_points'] = total_cost;
  return Obj;
};

// Units.create = (newUnit, result) => {
//   sql.query("INSERT INTO units SET ?", newUnit, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("created unit: ", { id: res.insertId, ...newUnit });
//     result(null, { id: res.insertId, ...newUnit });
//   });
// };

// Units.findById = (id, result) => {
//   sql.query(`SELECT * FROM units WHERE id = ${id}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found unit: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found Unit with the id
//     result({ kind: "not_found" }, null);
//   });
// };

// Units.getAll = (name, result) => {
//   let query = "SELECT * FROM units";

//   if (name) {
//     query += ` WHERE name LIKE '%${name}%'`;
//   }

//   sql.query(query, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("unit: ", res);
//     result(null, res);
//   });
// };

// Units.getAllPublished = result => {
//   sql.query("SELECT * FROM units WHERE published=true", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("unit: ", res);
//     result(null, res);
//   });
// };

// Units.updateById = (id, unit, result) => {
//   sql.query(
//     "UPDATE units SET name = ?, description = ?, published = ? WHERE id = ?",
//     [unit.name, unit.description, unit.published, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Unit with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated unit: ", { id: id, ...unit });
//       result(null, { id: id, ...unit });
//     }
//   );
// };

// Units.remove = (id, result) => {
//   sql.query("DELETE FROM units WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Unit with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted unit with id: ", id);
//     result(null, res);
//   });
// };

// Units.removeAll = result => {
//   sql.query("DELETE FROM units", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} unit`);
//     result(null, res);
//   });
// };

module.exports = PointsCalculator;