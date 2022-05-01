module.exports = (app) => {
  const articleController = require("../controllers/article.controller.js");

  const router = require("express").Router();

  router.post("/", articleController.create);
  router.get("/", articleController.findAll);
  router.get("/:id", articleController.findOne);
  router.put("/:id", articleController.update);
  router.delete("/:id", articleController.delete);
  router.delete("/", articleController.deleteAll);

  app.use("/api/articles", router);
};
