const { getPagination, getPagingData } = require("../helpers");
const db = require("../models");
const Payment = db.payment;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const payment = {
    title: req.body.title,
    description: req.body.description,
  };

  Payment.create(payment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the payment.",
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

  Payment.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payments.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Payment.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving payment with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Payment.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Payment was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update payment with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating payment with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Payment.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Payment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete payment with id=${id}. Maybe payment was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete payment with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Payment.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} payments were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all payments.",
      });
    });
};

exports.getAll = (req, res) => {
  Payment.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payments.",
      });
    });
};
