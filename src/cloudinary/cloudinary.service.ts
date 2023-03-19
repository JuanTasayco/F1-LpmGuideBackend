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
      const stream = streamifier.createReadStream(
        Buffer.from(base64Data, 'base64'),
      );
      stream.pipe(upload);
    });
  }

  async deleteImagesCloudByError(publicsId: string[]) {
    try {
      publicsId.forEach(async (publicId) => {
        const result = await v2.uploader.destroy(publicId);
        return result;
      });
    } catch (error) {
      console.log('errorDeleteImageCloudinary', error);
    }
  }
}
