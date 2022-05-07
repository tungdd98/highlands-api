module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("categories", {
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
    type: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    }
  });

  return Category;
};
