const { getPagination, getPagingData } = require("../helpers");
const db = require("../models");
const User = db.user;
const Location = db.location;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.email || !req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const user = {
    email: req.body.email,
    name: req.body.name,
  };

  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

exports.findAll = (req, res) => {
  const { page, perPage, id, email, name } = req.query;
  const condition = {};

  if (id) {
    condition.id = id;
  }
  if (email) {
    condition.email = { [Op.like]: `%${email}%` };
  }
  if (name) {
    condition.name = { [Op.like]: `%${name}%` };
  }

  const { limit, offset } = getPagination(page, perPage);

  User.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findOne({
    where: {
      id,
    },
    include: [Location],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Category.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

exports.totalUsers = (req, res) => {
  User.count()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error" + err,
      });
    });
};
