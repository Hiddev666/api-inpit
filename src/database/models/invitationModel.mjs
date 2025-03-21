// Invitation Schema and Model
import { Schema } from "mongoose";
import db from "../config.mjs";

const locationSchema = db.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  googleMapsUrl: {
    type: String,
    default: null,
  },
});

const invitationSchema = db.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    url: {
      type: String,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    guestLimit: {
      type: Number,
      required: true,
      default: 0,
    },
    location: locationSchema,
    invitationType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Invitation = db.model("invitations", invitationSchema);
export default Invitation;
