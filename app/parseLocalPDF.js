const fs = require('fs');
const pdf = require('pdf-parse');

async function parseLocalPDF(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);

  // set page range as an option
  const options = {
    max: 1 // limit parsing to the first page only
  };

  const data = await pdf(dataBuffer, options);

  parsePDFText(data.text);
  // console.log(data)

}

function parsePDFText(pdfText) {  
  const words = pdfText.split('\n');
  for (let i = 0; i < words.length; i++) {
    if (words[i] == 'State') {
      if (words[i + 1] != 'District') {
        console.log('State: ' + words[i + 1]);
      } else {
        console.log('no response');
      }
      break; // Break here, after checking the condition
    }
  }
  for (let i = 0; i < words.length; i++) {
    if (words[i] == 'District') {
      if (words[i + 1] != 'Block') {
        console.log('District: ' + words[i + 1]);
      } else {
        console.log('no response');
      }
      break; // Break here, after checking the condition
    }
  }
  for (let i = 0; i < words.length; i++) {
    if (words[i] == 'Block') {
      if (words[i + 1] != 'Rural / Urban') {
        console.log('Block: ' + words[i + 1]);
      } else {
        console.log('no response');
      }
      break; // Break here, after checking the condition
    }
  }
}



const pdfPath = '/Users/eazzopardi/code/pdf-to-db/sample report card.pdf';
parseLocalPDF(pdfPath);
