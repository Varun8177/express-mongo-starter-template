const mongoose = require("mongoose");

async function connectToDatabase(mongoURL) {
  console.log("Connecting to the database...");

  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw new Error("Error connecting to the database");
  }
}

module.exports = connectToDatabase;
