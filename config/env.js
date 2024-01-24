const { config } = require("dotenv");
const { cleanEnv, str, port } = require("envalid");

const validateEnv = () => {
  console.log("Validating env...");

  const env = config({
    path: `.env`,
  }).parsed;

  if (env.NODE_ENV === "development") {
    const cleanedEnv = cleanEnv(env, {
      port: port(),
      mongoURL: str(),
      NODE_ENV: str({
        choices: ["development", "test", "production", "staging"],
        default: "development",
      }),
    });

    console.log("Validated env: It's all good!");

    return cleanedEnv;
  }
  return env;
};

const env = validateEnv();

module.exports = env;
