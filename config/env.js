require("dotenv").config();

const validateEnv = () => {
  console.log("Validating env...");
  const mongoURL = process.env.mongoURL;
  const port = process.env.port;

  return { mongoURL, port };
};

const env = validateEnv();

module.exports = env;
