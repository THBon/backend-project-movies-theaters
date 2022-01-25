if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const cors = require("cors");

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

app.use(cors());
app.use(express.json());
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);
app.use(notFound);
app.use(errorHandler);

const router = express.Router()

router.get("/", cors(), (req, res) => {
  res.json({ message: "Data can be access via the following routes: /movies, /movies/:movieId, /movies/:movieId/theaters, /movies/:movieId/reviews, /reviews, /reviews/:reviewId, and /theaters"});
});

app.use('/', router);

module.exports = app;
