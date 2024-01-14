const express = require("express");
const { getUser, createUser } = require("../controllers/user.controller");
const UserRouter = express.Router();
const path = "/users";

UserRouter.get("/:userId", getUser);
UserRouter.post("/", createUser);

module.exports = { path, router: UserRouter };
