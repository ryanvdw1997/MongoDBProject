// Task 2iii

db.movies_metadata.aggregate([
    // TODO: Write your query here
    {
        $project:
        {
            budget: {$cond: {if: {$and: [{$eq: [{$isNumber: "$budget"}, false]}, {$or: [{$eq: ["$budget",undefined]},
            {$eq: ["$budget", null]},
            {$eq: ["$budget", false]},
            {$eq: ["$budget",""]}]}]}, then : "unknown", else: "$budget"}}
        }
    },
    {
        $project:
        {
           budget: {$cond: {if: {$and: [{$ne: ["$budget", "unknown"]}, {$ne: [{$isNumber: "$budget"}, true]}]},
           then: {$toInt: {$trim: {input: "$budget", chars: "USD\\$ "}}}, else: "$budget"}}
        }
    },
    {
        $project:
        {
            budget: {$cond: {if: {$eq: [{$isNumber: "$budget"}, true]}, then: {$round : ["$budget", -7]},
            else: "$budget"}}
        }
    },
    {$group: {_id: "$budget", count: {$sum: 1}}},
    {$project: {"budget": "$_id",_id: 0, count: 1}},
    {$sort: {budget: 1}}

]);