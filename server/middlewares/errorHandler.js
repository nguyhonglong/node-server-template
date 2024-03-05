const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (err.code === 11000) {
        err.statusCode = 400;
        for (let p in err.keyValue) {
            err.message = `${p} must be unique`
        }
    }

    if (err.kind === "ObjectId"){
        err.statusCode = 404;
        err.message = `The ${req.originalUrl} is not found because wrong Id`
    }

    

    res.status(err.statusCode).json({
        status: 'fail',
        message: err.message
    })

}
export default errorHandler;