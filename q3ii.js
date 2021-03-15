// Task 3ii

db.credits.aggregate([
    // TODO: Write your query here
    {$unwind: "$crew"},
    {$unwind: "$cast"},
    {$project: {cast: 1, crew: 1, movieId: 1}},
    {$match: {"crew.id": 5655, "crew.job": "Director"}},
    {$group: {_id: ["$cast.name", "$cast.id"], count: {$sum: 1}}},
    {$project: {name: {$first: "$_id"}, id: {$last: "$_id"}, count: 1, _id: 0}},
    {$sort: {count: -1, id: 1}},
    {$limit: 5}
]);