module.exports = (sequelize, Sequelize) => {
  const Delivery = sequelize.define("deliveries", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
  });

  return Delivery;
};
