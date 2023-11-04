// pages/api/upload.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import multer from 'multer';
import parsePDF from '../utils/pdfParse';
import type { NextApiRequestWithFile, Middleware } from '../types/index';

// Set up multer for buffering the file in memory
const upload = multer({ storage: multer.memoryStorage() });

// Initialize the router using createRouter
const router = createRouter<NextApiRequestWithFile, NextApiResponse>();

// Add the middleware to handle file upload
router.use((upload.single('file') as any) as Middleware<NextApiRequestWithFile, NextApiResponse>);

router.post(async (req, res) => {
  // Ensure req.file is available after multer processes the file upload
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  try {
    // Parse the PDF from the buffer and log the extracted text
    const pdfData = await parsePDF(req.file.buffer);
    console.log(pdfData.text); // This will log the raw data from the PDF

    // If your extractData function is designed to extract text, you can log that instead
    // const extractedText = extractData(pdfData);
    // console.log(extractedText);

    // Respond to the client to indicate success
    res.status(200).send('PDF processed. Check server console for output.');
  } catch (error: any) {
    console.error('Error processing PDF:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router.handler({
  onError: (err: any, req, res) => {
    console.error('Error handler:', err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
  onNoMatch: (req, res) => {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
