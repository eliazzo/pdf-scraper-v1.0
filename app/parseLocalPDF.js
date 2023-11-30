const fs = require('fs');
const pdf = require('pdf-parse');

async function parseLocalPDF(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer);

  const structuredData = parsePDFText(data.text);
  console.log("STRUCTURE DATA", structuredData)

}

function parsePDFText(pdfText) {
  const lines = pdfText.split('\n');
  const data = {};
  let lastKey = null;

  lines.forEach(line => {
    if (isKey(line)) {
      lastKey = line.trim(); // Update the last key
      data[lastKey] = null;  // Initialize the key with a null value
    } else if (isValue(line) && lastKey) {
      data[lastKey] = line.trim();
    }
  });

  return data;
}

function isKey(line) {
  return line.match(/[a-zA-Z]{3,}/); // Matches strings with more than 2 letters
}

function isValue(line) {
  return !isNaN(line.trim()) && line.trim() !== ''; // Checks if the line is a number
}




// Replace with your actual PDF path
const pdfPath = '/Users/eazzopardi/code/pdf-to-db/sample report card.pdf';
parseLocalPDF(pdfPath);
