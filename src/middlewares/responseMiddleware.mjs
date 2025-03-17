// API Response Format Middleware
export const responseMiddleware = (req, res, next) => {
    // Regular Success Response
    res.success = (code, message = "Success", data = null) => {
        res.status(code).send({
            message: message,
            data: data
        })
    }

    // Success Response With Pagination
    res.successWithPagination = (code, message = "Success", details = null, data = null) => {
        res.status(code).send({
            message: message,
            details: details,
            data: data
        })
    }

    // Failed Response
    res.fail = (message = "Failed", error = null) => {
        let errMessage
        let code = 500

        if (error.name == "ValidationError") {
            errMessage = "You Enter Invalid Data"
            code = 400
        } else if (error.code == 11000) {
            errMessage = "You Enter Existing Data"
            code = 400
        }

        res.status(code).send({
            message: message,
            error: errMessage == null ? error : errMessage
        })
    }

    next()
}
