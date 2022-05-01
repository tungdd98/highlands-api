const db = require("../models");
const System = db.system;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const system = {
    title: req.body.title,
    description: req.body.description,
    favicon: req.body.favicon,
    thumbnail: req.body.thumbnail,
    address: req.body.address,
    hotline: req.body.hotline,
    aboutPage: req.body.aboutPage,
    deliveryPocily: req.body.deliveryPocily,
    returnPolicy: req.body.returnPolicy,
  };

  System.create(system)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the system.",
      });
    });
};

exports.findOne = (req, res) => {
  System.findByPk(1)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving system with id=",
      });
    });
};

exports.update = (req, res) => {
  System.update(req.body, {
    where: { id: 1 },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "System was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update system`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating system with",
      });
    });
};
