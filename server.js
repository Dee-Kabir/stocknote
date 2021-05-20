const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const morgan = require("morgan");
const bodyParser = require("body-parser");

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connected to database"));

// middlewares
app.use(cors());
app.use(morgan("dev"))
app.use(bodyParser.json())

// routes middlewares
fs.readdirSync("./routes").map((route) =>
  app.use("/api", require(`./routes/${route}`))
);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/stocknote/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "stocknote", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API Running");
  });
}
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log("connected");
});