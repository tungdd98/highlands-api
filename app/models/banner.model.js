module.exports = (sequelize, Sequelize) => {
  const Banner = sequelize.define("banners", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    link: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    thumbnail: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  });

  return Banner;
};
