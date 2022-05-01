module.exports = (app) => {
  const paymentController = require("../controllers/payment.controller.js");

  const router = require("express").Router();

  router.post("/", paymentController.create);
  router.get("/", paymentController.findAll);
  router.get("/all", paymentController.getAll);
  router.get("/:id", paymentController.findOne);
  router.put("/:id", paymentController.update);
  router.delete("/:id", paymentController.delete);
  router.delete("/", paymentController.deleteAll);

  app.use("/api/payments", router);
};
