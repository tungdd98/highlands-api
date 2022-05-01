module.exports = (app) => {
  const bannerController = require("../controllers/banner.controller.js");

  const router = require("express").Router();

  router.post("/", bannerController.create);
  router.get("/", bannerController.findAll);
  router.get("/all", bannerController.getAll);
  router.get("/:id", bannerController.findOne);
  router.put("/:id", bannerController.update);
  router.delete("/:id", bannerController.delete);
  router.delete("/", bannerController.deleteAll);

  app.use("/api/banners", router);
};
