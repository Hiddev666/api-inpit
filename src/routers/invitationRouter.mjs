import { Router } from "express";
import { responseMiddleware } from "../middlewares/responseMiddleware.mjs";
import Invitation from "../database/models/invitationModel.mjs";
import slugify from "slugify";
import { adminJwtMiddleware } from "../middlewares/adminJwtMiddleware.mjs";
import { findById } from "../middlewares/findByIdMiddleware.mjs";

const invitationRouter = Router();

invitationRouter.use(responseMiddleware);

invitationRouter.get("/", adminJwtMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const startIndex = (page - 1) * limit;
        const total = await Invitation.countDocuments();

        const invitation = await Invitation.find()
            .select({ __v: 0 })
            .skip(startIndex)
            .limit(limit)
            .sort({ createdAt: -1 });

        const details = {
            page: page,
            limit: limit,
            items: total,
            pages: Math.ceil(total / limit),
        };
        res.successWithPagination(
            200,
            "Get All Invitation Success",
            details,
            invitation
        );
    } catch (err) {
        res.fail("Get All Invitation Failed", err.message);
    }
});

// Get Invitation by Id
// invitationRouter.get(
//     "/:id",
//     [findById, adminJwtMiddleware],
//     async (req, res) => {
//         try {
//             const { id } = req;
//             const invitation = await Invitation.findOne({ _id: id }).select({ __v: 0 });
//             res.success(200, "Get User by Id Success", invitation);
//         } catch (err) {
//             res.fail("Get User by Id Failed", err);
//         }
//     }
// );

// Get Invitation by User Id
invitationRouter.get(
    "/:id",
    [findById],
    async (req, res) => {
        try {
            const { id } = req;
            const invitation = await Invitation.findOne({ userId: id }).select({ __v: 0 });
            res.success(200, "Get User by User Id Success", invitation);
        } catch (err) {
            res.fail("Get User by User Id Failed", err);
        }
    }
);

// Create a New Invitation
invitationRouter.post("/", adminJwtMiddleware, async (req, res) => {
    try {
        const { body } = req;

        const slug = slugify(body.title).toLowerCase();
        const url = `http://localhost:3000/${slug}`;
        body.slug = slug;
        body.url = url;

        const newInvitation = await Invitation(body).save();
        res.success(201, "Create New Invitation Success", newInvitation);
    } catch (err) {
        res.fail("Create New Invitation Failed", err);
    }
});

// Update an Invitation
invitationRouter.patch(
    "/:id",
    [findById, adminJwtMiddleware],
    async (req, res) => {
        try {
            const { body, id } = req;

            if (body.title) {
                const slug = slugify(body.title).toLowerCase();
                body.slug = slug;
            }

            const invitation = await Invitation.findByIdAndUpdate(id, body);
            res.success(201, "Update an Invitation Success", body);
        } catch (err) {
            console.log(err.message);
            res.fail("Update an Invitation Failed", err);
        }
    }
);

// Delete an Invitation
invitationRouter.delete(
    "/:id",
    [findById, adminJwtMiddleware],
    async (req, res) => {
        try {
            const { id } = req;
            const invitation = await Invitation.findByIdAndDelete(id);
            res.success(201, "Delete an Invitation Success", invitation);
        } catch (err) {
            res.fail("Update an Invitation Failed", err);
        }
    }
);

export default invitationRouter;
