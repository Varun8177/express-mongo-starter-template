const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const errorMiddleware = require("./middlewares/ErrorMiddleware");
const env = require("./config/env");
const connectToDatabase = require("./config/db");
const Routes = require("./routes");

const app = express();

connectToDatabase(env.mongoURL);

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

app.listen(env.port, () => {
  console.log(`running at port ${env.port}`);
});
