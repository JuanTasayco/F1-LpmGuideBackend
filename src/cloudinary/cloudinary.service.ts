import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import * as streamifier from 'streamifier';
@Injectable()
export class CloudinaryService {
  async uploadImageFile(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadImageBase64(
    base64Data: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    base64Data = base64Data.replace(/^data:image\/\w+;base64,/, '');
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      console.log('file', base64Data);
      const stream = streamifier.createReadStream(
        Buffer.from(base64Data, 'base64'),
      );
      stream.pipe(upload);
    });
  }
}
