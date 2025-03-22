
import mongoose from "mongoose";
import logger from "./logger";

export default async function connect() {
    try {
        await mongoose.connect(<string>process.env.MONGO_URL);
        logger.info("db connected");
    }catch(error) {
       logger.error(error);
        process.exit(1);
    }
}