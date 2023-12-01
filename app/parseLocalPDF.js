const fs = require('fs');
const pdf = require('pdf-parse');
const { split } = require('postcss/lib/list');

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
  
  arr = ['State', 'District', 'Block', 'Rural / Urban', 'Cluster', 'Ward', 'Pincode', 'Panchayat']
    

  for (let i = 0; i < words.length; i++) {
    // check that words[i] matches a word in arr - words[i] concatenates some words so it is possible that the word in arr is a substring of a word in words
    (arr.some(word => {
      words.includes(word)
      console.log(word)
    }
    )) 


    // check that the following word, words[i + 1], exists in words but not in arr, that will check it is not a key but is indeed a value
   
  
  }
}


const pdfPath = '/Users/eazzopardi/code/pdf-to-db/sample report card.pdf';
parseLocalPDF(pdfPath);
