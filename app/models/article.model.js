module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("articles", {
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
    content: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    source: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    thumbnail: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    categoryId: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  });

  return Article;
};
