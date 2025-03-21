import { Router } from "express";
import { findById } from "../middlewares/findByIdMiddleware.mjs";
import Wish from "../database/models/wishModel.mjs";
import { responseMiddleware } from "../middlewares/responseMiddleware.mjs";

const wishRouter = Router();

wishRouter.use(responseMiddleware);

// Get Wish by Invitation Id
wishRouter.get("/:id", [findById], async (req, res) => {
  try {
    const { id } = req;
    const user = await Wish.find({ invitationId: id })
      .select({
        __v: 0,
      })
      .sort({ createdAt: -1 });
    res.success(200, "Get Wishes by Invitation Id Success", user);
  } catch (err) {
    res.fail("Get Wishes by Invitation Id Failed", err);
  }
});

// Create a New Wish
wishRouter.post("/", async (req, res) => {
  try {
    const { body } = req;

    const newWish = await Wish(body).save();
    res.success(201, "Create New Wish Success", newWish);
  } catch (err) {
    res.fail("Create New Wish Failed", err);
  }
});

export default wishRouter;
