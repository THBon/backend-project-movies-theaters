const PORT = process.env.PORT || 5000

const app = require("./app");
const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port ${PORT}!`);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);


const express = require("express")
const app = express()
const cors = require('cors')
const router = express.Router()

router.get("/", cors(), (req, res) => {
  res.json({ message: "Data can be access via the following routes: /movies, /movies/:movieId, /movies/:movieId/theaters, /movies/:movieId/reviews, /reviews, /reviews/:reviewId, and /theaters"});
});

module.exports = app