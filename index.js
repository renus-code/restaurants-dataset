const fs = require("fs");
const csv = require("csv-parser");

const inputFile = "trt_rest.csv"; // CSV file name
const outputFile = "trt_rest.json"; // Output JSON file

const results = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", () => {
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 4));
    console.log("✅ CSV successfully converted to JSON!");
    console.log("📁 File created:", outputFile);
  })
  .on("error", (err) => {
    console.error("❌ Error:", err.message);
  });
