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
  const splitwords = []
  words.forEach(word => {
    if (/[a-z][A-Z]/.test(word)){
    word = word.replace(/([a-z])([A-Z])/g, '$1 $2')
    }
    splitwords.push(word)
  })
  console.log("SPLIT WORDS", splitwords)
  

  arr = ['State', 'District', 'Block', 'Rural / Urban', 'Cluster', 'Ward', 'Pincode', 'Panchayat']
    

  for (let i = 0; i < splitwords.length; i++) {
    if (arr.some(word => splitwords.includes(word)) && !arr.some(a => splitwords[i + 1] && splitwords[i + 1].includes(a))) {
      console.log(splitwords[i] + ': ' + splitwords[i+1])
       // Break here, after checking the condition
    }
  }
  // for (let i = 0; i < words.length; i++) {
  //   if (words[i] == 'District') {
  //     if (words[i + 1] != 'Block') {
  //       console.log('District: ' + words[i + 1]);
  //     } else {
  //       console.log('no response');
  //     }
  //     break; // Break here, after checking the condition
  //   }
  // }
  // for (let i = 0; i < words.length; i++) {
  //   if (words[i] == 'Block') {
  //     if (words[i + 1] != 'Rural / Urban') {
  //       console.log('Block: ' + words[i + 1]);
  //     } else {
  //       console.log('no response');
  //     }
  //     break; // Break here, after checking the condition
  //   }
  // }
  ////
  // for (let i = 0; i < words.length; i++) {
  //   if (words[i] == 'MohallaPincode') {
  //     if (words[i + 1] != 'Pincode') {
  //       console.log('Mohalla: ' + words[i + 1]);
  //     } else {
  //       console.log('no response');
  //     }
  //     break; // Break here, after checking the condition
  //   }
//   }
// }
// }
}



const pdfPath = '/Users/eazzopardi/code/pdf-to-db/sample report card.pdf';
parseLocalPDF(pdfPath);
