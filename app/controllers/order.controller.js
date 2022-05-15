const { getPagination, getPagingData } = require("../helpers");
const db = require("../models");
const Order = db.order;
const OrderDetail = db.orderDetail;
const Product = db.product;
const Location = db.location;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const order = {
    userId: req.body.userId,
    locationId: req.body.locationId,
    paymentId: req.body.paymentId,
    deliveryId: req.body.deliveryId,
    totalQuantity: req.body.totalQuantity,
    totalMoney: req.body.totalMoney,
  };
  const carts = req.body.carts;

  Order.create(order)
    .then((data) => {
      res.send(data);
      carts.forEach((cart) => {
        const detail = {
          orderId: data.id,
          productId: cart.product.id,
          price: cart.product.price,
          quantity: cart.quantity,
        };
        OrderDetail.create(detail);
        Product.update(
          { quantity: cart.product.quantity - cart.quantity },
          { where: { id: cart.product.id } }
        );
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the order.",
      });
    });
};

exports.findByUserId = (req, res) => {
  const userId = req.params.userId;

  Order.findAll({
    where: {
      userId,
    },
    include: [OrderDetail],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving order with user id = " + userId,
      });
    });
};

exports.findAll = (req, res) => {
  const { page, perPage } = req.query;

  const { limit, offset } = getPagination(page, perPage);

  Order.findAndCountAll({
    limit,
    offset,
    include: [Location],
    order: [["id", "DESC"]],
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update order with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating order with id=" + id,
      });
    });
};

exports.findOrderDetailByOrderId = (req, res) => {
  const orderId = req.params.orderId;

  OrderDetail.findAll({
    where: {
      orderId,
    },
    include: [Product],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error retrieving order with order detail order id = " + orderId,
      });
    });
};

exports.statisticTotalQuantityOrders = (req, res) => {
  const { startTime, endTime } = req.query;

  Order.sum("totalQuantity", {
    where: {
      status: {
        [Op.eq]: 4,
      },
      updatedAt: {
        [Op.between]: [startTime, endTime || new Date()],
      },
    },
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error" + err,
      });
    });
};

exports.statisticTotalMoneyOrders = (req, res) => {
  const { startTime, endTime } = req.query;

  Order.sum("totalMoney", {
    where: {
      status: {
        [Op.eq]: 4,
      },
      updatedAt: {
        [Op.between]: [startTime, endTime || new Date()],
      },
    },
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error" + err,
      });
    });
};

exports.statisticTotalOrders = (req, res) => {
  const { startTime, endTime } = req.query;

  Order.count({
    where: {
      status: {
        [Op.eq]: 4,
      },
      updatedAt: {
        [Op.between]: [startTime, endTime || new Date()],
      },
    },
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error" + err,
      });
    });
};

exports.totalOrders = (req, res) => {
  Order.count()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error" + err,
      });
    });
};

exports.findLatestProducts = (req, res) => {
  OrderDetail.findAndCountAll({
    limit: 5,
    order: [["id", "DESC"]],
    group: "productId",
    include: [Product],
  })
    .then((data) => {
      const response = getPagingData(data, 1, 5);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};
