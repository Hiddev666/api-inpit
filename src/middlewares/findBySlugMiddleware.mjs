import mongoose from "mongoose"
export const findBySlug = (req, res, next) => {
    const { params: { slug } } = req
    req.slug = slug

    if (!mongoose.Types.ObjectId.isValid(id)) return res.fail("Bad Request", "Invalid Slug")
    next()
}
