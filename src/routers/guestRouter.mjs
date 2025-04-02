import { Router } from "express";
import { findById } from "../middlewares/findByIdMiddleware.mjs";
import Wish from "../database/models/wishModel.mjs";
import { responseMiddleware } from "../middlewares/responseMiddleware.mjs";
import Guest from "../database/models/guestModel.mjs";

const guestRouter = Router();

guestRouter.use(responseMiddleware);

// Get Wish by Invitation Id
guestRouter.get("/:id", [findById], async (req, res) => {
  try {
    const { id } = req;
    const guest = await Guest.find({ invitationId: id })
      .select({
        __v: 0,
      })
      .sort({ createdAt: -1 });
    res.success(200, "Get Guest by Invitation Id Success", guest);
  } catch (err) {
    res.fail("Get Guest by Invitation Id Failed", err);
  }
});

// Create a New Wish
guestRouter.post("/", async (req, res) => {
  try {
    const { body } = req;

    const newGuest = await Guest(body).save();
    res.success(201, "Create New Guest Success", newGuest);
  } catch (err) {
    res.fail("Create New Guest Failed", err);
  }
});

guestRouter.delete(
    "/:id",
    [findById],
    async (req, res) => {
        try {
            const { id } = req;
            const guest = await Guest.findByIdAndDelete(id);
            res.success(201, "Delete a Guest Success", guest);
        } catch (err) {
            res.fail("Update a Guest Failed", err);
        }
    }
);

export default guestRouter;
