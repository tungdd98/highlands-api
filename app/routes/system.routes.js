module.exports = (app) => {
  const systemController = require("../controllers/system.controller.js");

  const router = require("express").Router();

  router.post("/create_system", systemController.create);
  router.get("/", systemController.findOne);
  router.patch("/update_system", systemController.update);

  app.use("/api/systems", router);
};
