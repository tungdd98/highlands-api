const dbConfig = require("../configs/db.config");

const Sequelize = require("sequelize");
const { HOST, USER, PASSWORD, DB, pool, dialect } = dbConfig;

let sequelize;
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(DB, USER, PASSWORD, {
    HOST,
    dialect: dialect,
    operatorsAliases: 0,

    pool: {
      max: pool.max,
      min: pool.min,
      acquire: pool.acquire,
      idle: pool.idle,
    },

    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  });
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.location = require("./location.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);
db.banner = require("./banner.model.js")(sequelize, Sequelize);
db.article = require("./article.model.js")(sequelize, Sequelize);
db.payment = require("./payment.model.js")(sequelize, Sequelize);
db.delivery = require("./delivery.model.js")(sequelize, Sequelize);
db.order = require("./order.model.js")(sequelize, Sequelize);
db.orderDetail = require("./orderDetail.model.js")(sequelize, Sequelize);
db.system = require("./system.model.js")(sequelize, Sequelize);

db.category.hasMany(db.product);
db.product.belongsTo(db.category);
db.article.belongsTo(db.category);

db.user.hasMany(db.location);
db.location.belongsTo(db.user);

db.order.hasMany(db.orderDetail);
db.orderDetail.belongsTo(db.order);

db.user.hasMany(db.order);
db.order.belongsTo(db.user);

db.location.hasMany(db.order);
db.order.belongsTo(db.location);

db.product.hasMany(db.orderDetail);
db.orderDetail.belongsTo(db.product);

db.role.belongsToMany(db.user, {
  through: "users_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "users_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
