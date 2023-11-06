const cors = require("cors");
const express = require("express");
const authRoutes = require("./Routes/authRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const routes = require("./Routes/Routes");
const laptop = require("./Models/LaptopModel");
dotenv.config();
const app = express();
app.use(express.json({ extended: true }));

var bodyParser = require("body-parser");
   
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://saadi_26:saadi2612@training.d4jd37f.mongodb.net/techSphere",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send({
    message: "welcome to website ",
  });
});

//routes
app.use("/api", authRoutes);

app.use(express.json());

app.use("/", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on  Port " + PORT + process.env.Devmode + ".");
});
