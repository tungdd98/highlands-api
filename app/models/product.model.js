module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    include: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    thumbnail: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    price: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    isHot: {
      type: Sequelize.INTEGER,
      defaultValue: 2,
    },
    categoryId: {
      type: Sequelize.INTEGER,
    },
    views: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  });

  return Product;
};
