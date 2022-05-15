module.exports = (app) => {
  const orderController = require("../controllers/order.controller.js");

  const router = require("express").Router();

  router.get("/latest_products", orderController.findLatestProducts);
  router.get(
    "/total_quantity_orders_completed",
    orderController.statisticTotalQuantityOrders
  );
  router.get(
    "/total_money_orders_completed",
    orderController.statisticTotalMoneyOrders
  );
  router.get("/total_orders_completed", orderController.statisticTotalOrders);
  router.get("/total_orders", orderController.totalOrders);
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
