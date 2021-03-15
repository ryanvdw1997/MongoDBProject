// Task 2ii

db.movies_metadata.aggregate([
    {$project: {tagline: {$toLower: "$tagline"}}},
    {$project: {tagline: {$split: ["$tagline", " "]}}},
    {$unwind: "$tagline"},
    {$project: {tagline: {$trim: {input: "$tagline", chars: ",.!?"}}}},
    {$group: {_id : "$tagline", count: {$sum: 1}}},
    {$project: {_id: 1, count: 1, length : {$strLenCP: "$_id"}}},
    {$match : {length: {$gte: 4}}},
    {$sort: {count: -1}},
    {$project: {length: 0}},
    {$limit: 20}
]);