import PDFParser from 'pdf2json';

async function parseLocalPDF() {
  const pdfParser = new PDFParser();
  const pdfPath = '/Users/eazzopardi/code/pdf-to-db/sample report card.pdf';

  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));

  pdfParser.on("pdfParser_dataReady", pdfData => {
    console.log("PDF DATA", pdfData)
      pdfData.Pages.forEach(page => {
        page.Texts.forEach(text => {
          const textContent = text.R.map(r => decodeURIComponent(r.T)).join(' ');
          console.log(textContent);
        });
      });
  });
  
  pdfParser.loadPDF(pdfPath);
}

parseLocalPDF();





