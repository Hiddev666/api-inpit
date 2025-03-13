// Import Libraries
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import v1Router from "./routers/v1Router.mjs"

dotenv.config()
const PORT = process.env.SERVER_PORT

// Server Configuration
const app = express()
app.use(express.json())
app.use(cors())
app.use("/api/v1", v1Router)

app.get("/", (req, res) => {
    res.send({
        message: "Welcome To Inpit REST API! Go to /api to interact with the API."
    })
})

// Server Listen PORT
app.listen(PORT, () => {
    console.log(`Server | Server Running on Port ${PORT}`)
})
