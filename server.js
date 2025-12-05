const fs = require("fs");

// Load the JSON file
const data = JSON.parse(fs.readFileSync("trt_rest.json", "utf8"));

// Use a Map to ensure uniqueness by Restaurant Name
const uniqueMap = new Map();

data.forEach(item => {
    const name = item["Restaurant Name"];
    if (!uniqueMap.has(name)) {
        uniqueMap.set(name, item);
    }
});

// Convert back to array
const uniqueRestaurants = Array.from(uniqueMap.values());

// Print or save output
console.log("Unique count:", uniqueRestaurants.length);

// OPTIONAL: Write to a new JSON file
fs.writeFileSync("restaurants_unique.json", JSON.stringify(uniqueRestaurants, null, 2));

console.log("Created restaurants_unique.json");
