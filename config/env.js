const { config } = require("dotenv");
const { cleanEnv, str, port } = require("envalid");

const validateEnv = () => {
  console.log("Validating env...");

  const env = config({
    path: `.env`,
  }).parsed;

  const cleanedEnv = cleanEnv(env, {
    port: port(),
    mongoURL: str(),
  });

  console.log("Validated env: It's all good!");

  return cleanedEnv;
};

const env = validateEnv();

module.exports = env;