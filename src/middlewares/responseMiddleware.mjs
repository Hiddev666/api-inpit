// API Response Format Middleware
export const responseMiddleware = (req, res, next) => {
    res.success = (message = "Success", data) => {
        res.send({
            message: message,
            data: data
        })
    }

    res.fail = (message = "Failed", error = null) => {
        res.send({
            message: message,
            error: error
        })
    }

    next()
}
