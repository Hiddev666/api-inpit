import { Router } from "express"
import { responseMiddleware } from "../middlewares/responseMiddleware.mjs"
import User from "../database/models/userModel.mjs"
import CryptoJS from "crypto-js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()
const authRouter = Router()
authRouter.use(responseMiddleware)

authRouter.post("/login", async (req, res) => {
    try {
        const { body } = req
        const user = await User.findOne({ phone: body.phone })

        const decryptedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.CRYPTO_KEY
        ).toString(CryptoJS.enc.Utf8)
        if (decryptedPassword != body.password) return res.status(400).send({
            message: "Bad Request",
            error: "Your Enter Invalid Password"
        })

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_KEY,
            { expiresIn: "3d" }
        )

        const { password, __v, ...credentials } = user._doc

        res.cookie("token", token).success(200, "Login Success", { ...credentials, token })
    } catch (err) {
        console.log(err.message)
        res.fail("Login Failed", err)
    }
})

export default authRouter
