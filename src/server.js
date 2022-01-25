const express = require('express')
const cors = require('cors')

const app = express()
const router = express.Router()
const PORT = process.env.PORT || 5000

router.get("/", cors(), (req, res) => {
  res.json({ message: "Data can be access via the following routes: /movies, /movies/:movieId, /movies/:movieId/theaters, /movies/:movieId/reviews, /reviews, /reviews/:reviewId, and /theaters"});
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} `);
})

module.exports = app