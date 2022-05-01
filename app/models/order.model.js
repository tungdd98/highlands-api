module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("orders", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    locationId: {
      type: Sequelize.INTEGER,
    },
    paymentId: {
      type: Sequelize.INTEGER,
    },
    deliveryId: {
      type: Sequelize.INTEGER,
    },
    totalQuantity: {
      type: Sequelize.INTEGER,
    },
    totalMoney: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  });

  return Order;
};
