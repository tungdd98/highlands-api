const { getPagination, getPagingData } = require("../helpers");
const db = require("../models");
const Banner = db.banner;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.thumbnail) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const banner = {
    title: req.body.title,
    thumbnail: req.body.thumbnail,
    link: req.body.link,
  };

  Banner.create(banner)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the banner.",
      });
    });
};

exports.findAll = (req, res) => {
  const { page, perPage, id, title, status } = req.query;
  const condition = {};

  if (id) {
    condition.id = id;
  }
  if (status) {
    condition.status = status;
  }
  if (title) {
    condition.title = { [Op.like]: `%${title}%` };
  }

  const { limit, offset } = getPagination(page, perPage);

  Banner.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving banners.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Banner.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving banner with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Banner.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Banner was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update banner with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating banner with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Banner.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Banner was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete banner with id=${id}. Maybe banner was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete banner with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Banner.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} banners were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all banners.",
      });
    });
};

exports.getAll = (req, res) => {
  Banner.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving banners.",
      });
    });
};
