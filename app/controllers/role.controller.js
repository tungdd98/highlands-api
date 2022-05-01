const { getPagination, getPagingData } = require("../helpers");
const db = require("../models");
const Role = db.role;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Role name can not be empty!",
    });
    return;
  }

  const role = {
    name: req.body.name,
    id: req.body.id,
  };

  Role.create(role)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the role.",
      });
    });
};

exports.getAll = (req, res) => {
  Role.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving roles.",
      });
    });
};
