const { getPagination, getPagingData } = require("../helpers");
const db = require("../models");
const Delivery = db.delivery;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const delivery = {
    title: req.body.title,
    price: req.body.price,
  };

  Delivery.create(delivery)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the delivery.",
      });
    });
};

exports.findAll = (req, res) => {
  const { page, perPage, id, title } = req.query;
  const condition = {};

  if (id) {
    condition.id = id;
  }
  if (title) {
    condition.title = { [Op.like]: `%${title}%` };
  }

  const { limit, offset } = getPagination(page, perPage);

  Delivery.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving deliveries.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Delivery.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving delivery with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Delivery.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Delivery was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update delivery with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating delivery with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Delivery.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Delivery was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete delivery with id=${id}. Maybe delivery was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete delivery with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Delivery.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} deliveries were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all deliveries.",
      });
    });
};

exports.getAll = (req, res) => {
  Delivery.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving deliveries.",
      });
    });
};
