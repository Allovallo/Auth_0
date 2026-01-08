const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");

const app = express();

app.use(cors());
app.use(express.json());

const tempDir = path.join(__dirname, "temp");
console.log(__dirname);

const multerConfig = multer.diskStorage({
  // destinantion: tempDir,
  destination: (req, file, cb) => cb(null, tempDir),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: multerConfig });

const books = [];

app.get("/api/books", (req, res) => {
  res.json(books);
});

// upload.fields([{name: 'cover', maxCount: 1}, {name: 'subcover', maxCount: 2}])
// upload.array('cover', 8)


app.post("/api/books", upload.single("cover"), async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  await fs.rename("./temp/cover.jpg", "./public/books/cover.jpg");
});

app.listen(3000);
