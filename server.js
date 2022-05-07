const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dbConfig = require("./app/configs/db.config");
const { initialRole } = require("./app/database");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// setting middleware
app.use(express.static(path.resolve("./public")));

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   initialRole();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application 123" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/upload.routes")(app);
require("./app/routes/banner.routes")(app);
require("./app/routes/article.routes")(app);
require("./app/routes/payment.routes")(app);
require("./app/routes/delivery.routes")(app);
require("./app/routes/location.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/system.routes")(app);
require("./app/routes/role.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
