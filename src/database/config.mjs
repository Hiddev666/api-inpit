// MongoDB Connection Configuration
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
mongoose.connect(process.env.MONGODB_STRING)
    .then(() => console.log(`Database | MongoDB Connected`))
    .catch((err) => console.log(`Database | ${err.message}`))

export default mongoose
