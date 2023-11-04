// app/scripts/parseLocalPDF.js
import fs from 'fs';
import PDFParser from 'pdf2json';

async function parseLocalPDF() {
  const pdfParser = new PDFParser();

  // Use the full file path directly
  const pdfPath = '/Users/eazzopardi/code/pdf-to-db/sample report card.pdf';

  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
  pdfParser.on("pdfParser_dataReady", pdfData => {
    console.log("PDF DATA", pdfData)
      pdfData.Pages.forEach(page => {
        page.Texts.forEach(text => {
          // Each text item is an object with R array containing text fragments
          // Decode URI-encoded strings
          const textContent = text.R.map(r => decodeURIComponent(r.T)).join(' ');
          console.log(textContent);
        });
      });
  });

  // Load the PDF file
  pdfParser.loadPDF(pdfPath);
}

parseLocalPDF();





