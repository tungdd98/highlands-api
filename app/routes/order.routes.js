module.exports = (app) => {
  const orderController = require("../controllers/order.controller.js");

  const router = require("express").Router();

  router.post("/", orderController.create);
  router.get("/:userId", orderController.findByUserId);
  router.get("/", orderController.findAll);
  router.patch("/update_status_order/:id", orderController.update);
  router.get(
    "/find_by_order_id/:orderId",
    orderController.findOrderDetailByOrderId
  );

  app.use("/api/orders", router);
};
