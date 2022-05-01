const { getPagination, getPagingData } = require("../helpers");
const db = require("../models");
const Location = db.location;

exports.create = (req, res) => {
  if (!req.body.address || !req.body.userId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const location = {
    title: req.body.title,
    userId: req.body.userId,
    address: req.body.address,
    phone: req.body.phone,
    name: req.body.name,
  };

  Location.create(location)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the location.",
      });
    });
};

exports.findAll = (req, res) => {
  const { page, perPage, id } = req.query;
  const condition = {};

  if (id) {
    condition.id = id;
  }

  const { limit, offset } = getPagination(page, perPage);

  Location.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving locations.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Location.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving location with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Location.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Location was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update location with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating location with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Location.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Location was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete location with id=${id}. Maybe location was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete location with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Location.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} locations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all locations.",
      });
    });
};

exports.getAll = (req, res) => {
  Location.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving locations.",
      });
    });
};
