import pdfParse from 'pdf-parse';
 
export const parsePDF = async (buffer) => {
  return await pdfParse(buffer);
};

