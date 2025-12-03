const fs = require("fs");
const csv = require("csv-parser");

const inputFile = "trt_rest.csv";
const outputFile = "trt_rest.json";

const results = [];

// ✅ Function to remove BOM from first key
function stripBOM(obj) {
  const key = Object.keys(obj)[0];
  const cleanKey = key.replace(/^\uFEFF/, ""); // ✅ removes BOM

  if (key !== cleanKey) {
    obj[cleanKey] = obj[key];
    delete obj[key];
  }
  return obj;
}

fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (data) => {
    const cleanData = stripBOM(data); // ✅ Remove BOM here
    results.push(cleanData);
  })
  .on("end", () => {
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 4), "utf8");
    console.log("✅ CSV converted to clean JSON (BOM removed)!");
    console.log("📁 Output:", outputFile);
  })
  .on("error", (err) => {
    console.error("❌ Error:", err.message);
  });
