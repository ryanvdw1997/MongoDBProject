// Task 1i

db.keywords.aggregate([
    // TODO: Write your query here
    {$match: {$or : [{keywords: {$elemMatch : {name: "time travel"}}}, {keywords: {$elemMatch: {name: "presidential election"}}}]}},
    {$project : {"keywords" : 0,
    "_id" : 0}},
    {$sort: {"movieId": 1}}


]);