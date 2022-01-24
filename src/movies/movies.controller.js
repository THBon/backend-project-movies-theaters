const service = require("./movies.service");
const asyncErrorBounddary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    return next ({
        status: 404,
        message: `Movie cannot be found`,
    })
};

async function list(req, res, next) {
    const { is_showing } = req.query;
    if (is_showing) {
        const data = await service.listShowing();
        return res.json({ data });
    }
    const data = await service.list();
    res.json({ data });
};

async function read(req, res, next) {
    res.json({ data: res.locals.movie });
};

async function readTheaters(req, res, next) {
    const { movieId } = req.params;
    const data = await service.readTheaters(movieId);
    res.json({ data });
};

async function readReviews(req, res, next) {
    const { movieId } = req.params;
    const data = await service.readReviews(movieId);
    res.json({ data });
}

module.exports = {
    list,
    read: [asyncErrorBounddary(movieExists), read],
    readTheaters: [asyncErrorBounddary(movieExists), asyncErrorBounddary(readTheaters)],
    readReviews: [asyncErrorBounddary(movieExists), asyncErrorBounddary(readReviews)],
}