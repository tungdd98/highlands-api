const { getPagination, getPagingData } = require("../helpers");
const db = require("../models");
const Article = db.article;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const article = {
    title: req.body.title,
    thumbnail: req.body.thumbnail,
    description: req.body.description,
    content: req.body.content,
    author: req.body.author,
    source: req.body.source,
    status: req.body.status,
  };

  Article.create(article)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the article.",
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

  Article.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Article.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving article with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Article.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Article was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update article with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating article with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Article.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Article was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete article with id=${id}. Maybe article was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete article with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Article.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Articles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all articles.",
      });
    });
};
