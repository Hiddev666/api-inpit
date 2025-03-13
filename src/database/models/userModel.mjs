// User Schema and Model
import db from "../config.mjs";

const UserSchema = db.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 50
        },
        password: {
            type: String,
            required: true,
            minLength: 3,
        },
        phone: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 15,
            unique: true
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"]
        }
    },
    {timestamps: true}
)

const User = db.model("users", UserSchema)
export default User
