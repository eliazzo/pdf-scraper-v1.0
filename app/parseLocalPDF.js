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


}

function parsePDFText(pdfText) {  
  const words = pdfText.split('\n');
  
  arr = ['State', 'District', 'Block', 'Rural / Urban', 'Cluster', 'Ward', 'Pincode', 'Panchayat', 'City', 'Municipality', 'School Category', 'School Management', 'Medium 1']
    

  words.forEach( (word, i) => {
      // identify the variables
      // check that the word matches a string in arr - words concatenates some strings so it is possible that the string in arr is a substring of a string in words
       if (arr.some(variable=> word.includes(variable)))
       {
          // identify values
          // Error handling needed here. Eg check that the following word, words[i + 1], exists in words but not in arr, that will check it is not a key but is indeed a value
          const value = words[i + 1]
          // console.log variable: value
          console.log(word, " : ", value)
       }
      }
  )


   
  
  }



const pdfPath = '/Users/eazzopardi/code/pdf-to-db/sample report card.pdf';
parseLocalPDF(pdfPath);
