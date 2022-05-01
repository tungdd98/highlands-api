module.exports = (app) => {
  const deliveryController = require("../controllers/delivery.controller.js");

  const router = require("express").Router();

  router.post("/", deliveryController.create);
  router.get("/", deliveryController.findAll);
  router.get("/all", deliveryController.getAll);
  router.get("/:id", deliveryController.findOne);
  router.put("/:id", deliveryController.update);
  router.delete("/:id", deliveryController.delete);
  router.delete("/", deliveryController.deleteAll);

  app.use("/api/deliveries", router);
};
