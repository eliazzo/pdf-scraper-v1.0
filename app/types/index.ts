// types/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';

export type Middleware<T = NextApiRequest, U = NextApiResponse> = (
    req: T,
    res: U,
    next: (err?: any) => void
  ) => void | Promise<void>;

// export interface NextApiRequestWithFile extends NextApiRequest {
//     file: File;
//   }

export interface NextApiRequestWithFile extends NextApiRequest {
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    stream: Readable;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
  };
}
