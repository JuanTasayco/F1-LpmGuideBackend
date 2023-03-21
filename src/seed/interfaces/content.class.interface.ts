/* interfaz clase usada para validar el arreglo de objetos del DTO, especificamente para la entidad imagenesLpm */

import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class ContentImagesLpm {
  @IsString()
  subtitles: string;

  @IsOptional()
  @Transform(({ value }) => value ?? undefined)
  imagesUrl?: string;

  @IsOptional()
  @IsString()
  publicIdImage?: string;
}
