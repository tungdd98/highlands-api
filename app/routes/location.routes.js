module.exports = (app) => {
  const locationController = require("../controllers/location.controller.js");

  const router = require("express").Router();

  router.post("/", locationController.create);
  router.get("/", locationController.findAll);
  router.get("/all", locationController.getAll);
  router.get("/:id", locationController.findOne);
  router.put("/:id", locationController.update);
  router.delete("/:id", locationController.delete);
  router.delete("/", locationController.deleteAll);

  app.use("/api/locations", router);
};
