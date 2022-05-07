const { getPagination, getPagingData } = require("../helpers");
const db = require("../models");
const Product = db.product;
const Category = db.category;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title || !req.body.price) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const product = {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    include: req.body.include,
    thumbnail: req.body.thumbnail,
    status: req.body.status,
    quantity: req.body.quantity,
    price: req.body.price,
    isHot: req.body.isHot,
    categoryId: req.body.categoryId,
    views: req.body.views,
  };

  Product.create(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product.",
      });
    });
};

exports.findAll = (req, res) => {
  const {
    page,
    perPage,
    id,
    title,
    isHot,
    categoryId,
    status,
    sort,
    startPrice,
    endPrice,
  } = req.query;
  const condition = {};
  const order = [];

  if (id) {
    condition.id = id;
  }

  if (title) {
    condition.title = { [Op.like]: `%${title}%` };
  }

  if (isHot) {
    condition.isHot = isHot;
  }

  if (categoryId) {
    condition.categoryId = categoryId;
  }

  if (status) {
    condition.status = status;
  }

  if (sort) {
    switch (sort) {
      case "name_asc":
        order.push(["title", "ASC"]);
        break;

      case "name_desc":
        order.push(["title", "DESC"]);
        break;

      case "price_asc":
        order.push(["price", "ASC"]);
        break;

      case "price_desc":
        order.push(["price", "DESC"]);
        break;

      case "created_at_asc":
        order.push(["id", "ASC"]);
        break;

      default:
        order.push(["id", "DESC"]);
        break;
    }
  } else {
    order.push(["id", "DESC"]);
  }

  if (startPrice && endPrice) {
    condition.price = {
      [Op.between]: [+startPrice, +endPrice],
    };
  }

  const { limit, offset } = getPagination(page, perPage);

  Product.findAndCountAll({
    where: condition,
    limit,
    offset,
    include: [Category],
    order,
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving product with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update product with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating product with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete product with id=${id}. Maybe product was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete product with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} products were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products.",
      });
    });
};
