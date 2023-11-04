// utils/parsePDF.ts

const parsePDF = async (buffer: Buffer): Promise<any> => {
    const pdfParse = require('pdf-parse');
    return await pdfParse(buffer);
  };
  
  export default parsePDF;
  