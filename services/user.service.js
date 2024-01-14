const mongoose = require("mongoose");
const HttpException = require("../exceptions/HttpException");
const UserModel = require("../models/user.model");

const getUserService = async (UserId) => {
  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(UserId);

    if (!isValidObjectId) {
      throw new HttpException(400, "please provide a valid user id");
    }

    const user = await UserModel.findOne({ _id: UserId });

    if (!user) {
      throw new HttpException(404, "No user found");
    }

    return user;
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new HttpException(500, "Error fetching user");
    }
  }
};

const createUserService = async (details) => {
  try {
    const user = new UserModel(details);
    await user.save();
    return user;
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = [];

      for (const key in error.errors) {
        validationErrors.push(error.errors[key].message);
      }

      const errorMessage = `Validation error: ${validationErrors.join(", ")}`;

      throw new HttpException(400, errorMessage);
    } else if (error instanceof HttpException) {
      throw error;
    } else {
      throw new HttpException(500, "Error fetching user");
    }
  }
};

module.exports = { getUserService, createUserService };
