// Invitation Schema and Model
import { Schema } from "mongoose";
import db from "../config.mjs";

const guestSchema = db.Schema({
    guestName: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    invitationId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "invitations"
    }
}, { timestamps: true });

const Guest = db.model("guests", guestSchema);
export default Guest;
