import { config } from "dotenv"

config()

export const enviroments = {
    JWT_SECRET: process.env.JWT_SECRET!,
    DATABASE_URL: process.env.DATABASE_URL!,
}