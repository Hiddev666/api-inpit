import mongoose from "mongoose"
export const findById = (req, res, next) => {
    const { params: { id } } = req
    req.id = id

    if (!mongoose.Types.ObjectId.isValid(id)) return res.fail("Bad Request", "Invalid ID Format")
    next()
}
