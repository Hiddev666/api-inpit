import { Router } from "express"
import userRouter from "./userRouter.mjs"
import authRouter from "./authRouter.mjs"
import invitationRouter from "./invitationRouter.mjs"
import wishRouter from "./wishRouter.mjs"
import guestRouter from "./guestRouter.mjs"

const v1Router = Router()
// Routers for V1
v1Router.use("/users", userRouter)
v1Router.use("/auth", authRouter)
v1Router.use("/invitations", invitationRouter)
v1Router.use("/wishes", wishRouter)
v1Router.use("/guests", guestRouter)

export default v1Router
