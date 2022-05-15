module.exports = (app) => {
  const productController = require("../controllers/product.controller.js");

  const router = require("express").Router();

  router.get("/total_products", productController.totalProducts);
  router.post("/", productController.create);
  router.get("/", productController.findAll);
  router.get("/:id", productController.findOne);
  router.put("/:id", productController.update);
  router.delete("/:id", productController.delete);
  router.delete("/", productController.deleteAll);

  app.use("/api/products", router);
};
