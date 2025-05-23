import { config } from "dotenv";
config({ path: "./.env" });

const requiredEnv = ["DATABASE_URL", "JWT_SECRET"];

for (const key of requiredEnv) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

export const { DATABASE_URL, JWT_SECRET } = process.env;
export const PORT = process.env.PORT || 8888;
