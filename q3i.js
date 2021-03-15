// Task 3i

db.credits.aggregate([
    // TODO: Write your query here
    {$unwind: "$cast"},
    {$project: {_id: 0, movieId: 1, cast: 1}},
    {$match: {"cast.id": 7624}},
    {$lookup: {from: "movies_metadata", localField: "movieId", foreignField: "movieId", as: "stan"}},
    {$project: {title: "$stan.title", release_date: "$stan.release_date", character: "$cast.character"}},
    {$unwind: "$title"},
    {$unwind: "$release_date"},
    {$sort: {"release_date": -1}}
]);