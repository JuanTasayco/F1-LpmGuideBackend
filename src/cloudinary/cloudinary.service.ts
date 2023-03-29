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

  async validateBase64(archivoBase64: string) {
    if (!/^data:image\/\w+;base64,/.test(archivoBase64)) {
      return false;
    } else {
      return true;
    }
  }

  async validateResourceCloudinary(publicId: string) {
    try {
      await v2.api.resource(publicId);
      console.log('recurso Valido');
      return true;
    } catch (error) {
      console.log('recurso no válido');
      return false;
    }
  }

  async deleteImagesCloudByError(publicsId: string[]) {
    const promesas = publicsId.map(async (publicId) => {
      try {
        const result = await v2.uploader.destroy(publicId);
        return result;
      } catch (error) {
        console.log('Error al borrar imagen desde cloudinary');
        throw error;
      }
    });
    try {
      await Promise.all(promesas);
    } catch (error) {
      console.log('Error al eliminar imagenes');
    }
  }
}
