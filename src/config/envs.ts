process.loadEnvFile();
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  NODE_ENV: get("NODE_ENV").required().asString(),
  DATABASE_USERNAME: get("DATABASE_USERNAME").required().asString(),
  DATABASE_PASSWORD: get("DATABASE_PASSWORD").required().asString(),
  DATABASE_HOST: get("DATABASE_HOST").required().asString(),
  DATABASE_PORT: get("DATABASE_PORT").required().asPortNumber(),
  DATABASE_NAME: get("DATABASE_NAME").required().asString(),
  
  // JWT Configuration
  JWT_SECRET: get("JWT_SECRET").required().asString(),
  JWT_EXPIRES_IN: get("JWT_EXPIRES_IN").default("2h").asString(),
  
  // Email Configuration
  EMAIL_SERVICE: get("EMAIL_SERVICE").required().asString(),
  EMAIL_USER: get("EMAIL_USER").required().asString(),
  EMAIL_PASSWORD: get("EMAIL_PASSWORD").required().asString(),
  EMAIL_FROM: get("EMAIL_FROM").required().asString(),
  
  // Frontend URL for email verification
  FRONTEND_URL: get("FRONTEND_URL").required().asString(),
};