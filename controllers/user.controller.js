const HttpException = require("../exceptions/HttpException");
const {
  getUserService,
  createUserService,
} = require("../services/user.service");

const getUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await getUserService(userId);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const details = req.body;
  try {
    const user = await createUserService(details);
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, createUser };
