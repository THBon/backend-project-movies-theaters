function errorHandler(err, req, res, next) {
    console.log(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
};

module.exports = errorHandler;