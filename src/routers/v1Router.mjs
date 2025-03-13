import { Router } from "express"
import userRouter from "./userRouter.mjs"

const v1Router = Router()
// Routers for V1
v1Router.use("/users", userRouter)

export default v1Router
