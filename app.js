require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const itemsRouter = require("./routes/items");
app.use("/items", itemsRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
