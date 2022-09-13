require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Character Builder - Calculator." });
  // TODO: Criar lista de rotas
});

require("./app/routes/squad.routes.js")(app);
require("./app/routes/units.routes.js")(app);
require("./app/routes/users.routes.js")(app);

// set port, listen for requests
// const PORT = process.env.PORT || 8080;
// const PORT = process.env.NODEJS_LOCAL_PORT || 3000;
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server [Process: ${process.pid}] is running on port ${PORT}.`);
});
