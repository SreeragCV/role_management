const express = require("express");
const app = express();
const router = require("./route/user");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoUrl = "mongodb://127.0.0.1:27017/role-management";

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
  exposedHeaders: "Authorization",
};

app.use(express.json());
app.use(cors(corsOptions));

mongoose
  .connect(mongoUrl)
  .then(() => console.log("MONGO connection opened"))
  .catch((e) => console.log("Error: ", e));

app.use("/", router);

app.listen(5000, () => {
  console.log("Listening on PORT 5000");
});
