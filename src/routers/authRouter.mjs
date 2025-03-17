import { Router } from "express"
import { responseMiddleware } from "../middlewares/responseMiddleware.mjs"
import User from "../database/models/userModel.mjs"
import CryptoJS from "crypto-js"
import dotenv from "dotenv"

dotenv.config()
const authRouter = Router()
authRouter.use(responseMiddleware)

authRouter.post("/login", async (req, res) => {
    try {
        const { body: { phone, password } } = req
        const user = await User.find({ phone })

        // const decryptedPassword = CryptoJS.AES.decrypt(
        //     user.password,
        //     process.env.CRYPTO_KEY
        // ).toString(CryptoJS.enc.Utf8)

        res.send({
            data: user
        })
    } catch (err) {
        console.log(err.message)
        res.fail("Login Failed", err)
    }
})

export default authRouter
