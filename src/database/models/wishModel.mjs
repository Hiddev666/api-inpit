// Invitation Schema and Model
import { Schema } from "mongoose";
import db from "../config.mjs";

const wishSchema = db.Schema({
    guestName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    invitationId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "invitations"
    }
}, { timestamps: true });

const Wish = db.model("wishes", wishSchema);
export default Wish;
