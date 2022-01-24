const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const criticDetails = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first();
};

function update (updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*")
        .then(() => {
            return knex("reviews as r")
                .join("critics as c", "c.critic_id", "r.critic_id")
                .select("*")
                .where({ review_id: updatedReview.review_id })
                .first()
                .then(criticDetails);
        });
};

function destroy (reviewId) {
    return knex("reviews")
        .where({ review_id: reviewId })
        .del();
};


module.exports = {
    read,
    update,
    delete: destroy,
};