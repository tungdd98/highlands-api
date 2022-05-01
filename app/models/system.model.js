module.exports = (sequelize, Sequelize) => {
  const System = sequelize.define("systems", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    favicon: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    thumbnail: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    hotline: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    aboutPage: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    deliveryPocily: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    returnPolicy: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  });

  return System;
};
