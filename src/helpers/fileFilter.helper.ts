import { BadRequestException, NotFoundException } from '@nestjs/common';

export enum FileValidationErrors {
  UNSUPPORTED_FILE_TYPE,
}

export const fileFilter = (
  request: any,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file)
    throw new BadRequestException('Make sure that the file is an image');

  const fileExtension = file.mimetype.split('/')[1];
  const extAvailables: string[] = ['jpg', 'png', 'gif', 'jpeg', 'webp'];

  if (extAvailables.includes(fileExtension)) {
    return callback(null, true);
  }

  request.fileValidationError = FileValidationErrors.UNSUPPORTED_FILE_TYPE;
  console.log(request.fileValidationError);

  callback(null, false);
};
