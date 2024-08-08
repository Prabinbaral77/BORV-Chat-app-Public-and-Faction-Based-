import { config } from "dotenv";

config();

export const CREDENTIALS = process.env.CREDENTIALS === "true";

export const { PORT, ENVIRONMENT, MONGO_URI } = process.env;
