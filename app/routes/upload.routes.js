module.exports = (app) => {
  const path = require("path");
  const router = require("express").Router();
  const multer = require("multer");

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
  const upload = multer({ storage: storage });

  router.post("/post", upload.single("file"), (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).send({ message: "Please upload a file." });
    }
    return res.send({ message: "File uploaded successfully.", file });
  });

  app.use("/api/upload", router);
};
