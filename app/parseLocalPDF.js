const fs = require('fs');
const pdf = require('pdf-parse');
const XLSX = require('xlsx');

async function parseLocalPDF(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer);

  const structuredData = parsePDFText(data.text);
  const excelData = createExcelData(structuredData);
  exportToExcel(excelData, 'output.xlsx');
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


function createExcelData(data) {
  return [data]; // Wrapping the single object in an array to create a single row
}

function exportToExcel(data, fileName) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, fileName);
}

// Replace with your actual PDF path
const pdfPath = '/Users/eazzopardi/code/pdf-to-db/sample report card.pdf';
parseLocalPDF(pdfPath);
