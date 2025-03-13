import { Router } from "express"
import { responseMiddleware } from "../middlewares/responseMiddleware.mjs"
import User from "../database/models/userModel.mjs"
import CryptoJS from "crypto-js"

const userRouter = Router()
userRouter.use(responseMiddleware)

// GET All Users
userRouter.get("/", async (req, res) => {
    try {
        const users = await User.find().select({ __v: 0 })
        res.success("Get All Users Success", users)
    } catch (err) {
        res.fail("Create New User Failed", err.message)
    }
})

userRouter.get("/:id", async (req, res) => {
    const { params: { id } } = req

    try {
        const user = await User.findOne({ _id: id }).select({ __v: 0 })
        res.success("Get All Users Success", user)
    } catch (err) {
        res.fail("Create New User Failed", err.message)
    }
})

// Create a New User
userRouter.post("/", async (req, res) => {
    try {
        const { body } = req
        const encryptedPassword = CryptoJS.AES.encrypt(body.password, process.env.CRYPTO_KEY)
        body.password = encryptedPassword

        const newUser = await User(body).save()
        res.success("Create New User Success", newUser)
    } catch (err) {
        res.fail("Create New User Failed", err.message)
    }
})

export default userRouter
