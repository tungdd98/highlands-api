module.exports = (app) => {
  const roleController = require("../controllers/role.controller.js");

  const router = require("express").Router();

  router.post("/", roleController.create);
  router.get("/all", roleController.getAll);

  app.use("/api/roles", router);
};
