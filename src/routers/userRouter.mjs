import { Router } from "express"
import { responseMiddleware } from "../middlewares/responseMiddleware.mjs"
import User from "../database/models/userModel.mjs"
import CryptoJS from "crypto-js"
import { findById } from "../middlewares/findByIdMiddleware.mjs"

const userRouter = Router()
userRouter.use(responseMiddleware)

// GET All Users
userRouter.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10

        const startIndex = (page - 1) * limit
        const total = await User.countDocuments()

        const users = await User.find()
            .select({ __v: 0 })
            .skip(startIndex)
            .limit(limit)
            .sort({ createdAt: -1 })

        const details = {
            page: page,
            limit: limit,
            items: total,
            pages: Math.ceil(total / limit)
        }
        res.successWithPagination(200, "Get All Users Success", details, users)
    } catch (err) {
        res.fail("Get All Users Failed", err.message)
    }
})

// Get User by ID
userRouter.get("/:id", findById, async (req, res) => {
    try {
        const { id } = req
        const user = await User.findOne({ _id: id }).select({ __v: 0 })
        res.success(200, "Get User by ID Success", user)
    } catch (err) {
        res.fail("Get User by ID Failed", err)
    }
})

// Create a New User
userRouter.post("/", async (req, res) => {
    try {
        const { body } = req
        const encryptedPassword = CryptoJS.AES.encrypt(body.password, process.env.CRYPTO_KEY)
        body.password = encryptedPassword

        const newUser = await User(body).save()
        res.success(201, "Create New User Success", newUser)
    } catch (err) {
        res.fail("Create New User Failed", err)
    }
})

// Update a User
userRouter.patch("/:id", findById, async (req, res) => {
    try {
        const { body, id } = req
        const user = await User.findByIdAndUpdate(id, body)
        res.success(201, "Update a User Success", user)
    } catch (err) {
        console.log(err.message)
        res.fail("Update a User Failed", err)
    }
})

// Delete a User
userRouter.delete("/:id", findById, async (req, res) => {
    try {
        const { id } = req
        const user = await User.findByIdAndDelete(id)
        res.success(201, "Delete a User Success", user)
    } catch (err) {
        res.fail("Update a User Failed", err)
    }
})

export default userRouter
