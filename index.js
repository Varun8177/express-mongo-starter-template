const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const errorMiddleware = require("./middlewares/ErrorMiddleware");
const connectToDatabase = require("./config/db");
const Routes = require("./routes");

const port = process.env.port;

const app = express();

connectToDatabase();

app.use(
  cors({
    origin: ["http://localhost:3000", "/localhost:/"],
    methods: ["GET", "POST", `PUT`, `PATCH`, `DELETE`],
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.status(200).send("Welcome to the server");
});

Routes.map(({ path, router }) => app.use(path, router));

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
