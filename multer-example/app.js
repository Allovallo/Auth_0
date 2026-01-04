const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const tempDir = path.join(__dirname, "temp");

const multerConfig = multer.diskStorage({
  destinantion: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: multerConfig });

const books = [];

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.post("/api/books", upload.single("cover"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
});

app.listen(3000);
