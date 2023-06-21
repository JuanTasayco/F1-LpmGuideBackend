import { Type } from 'class-transformer';
import { IsArray, IsString, IsOptional, ValidateNested } from 'class-validator';
import { ContentImagesLpm } from 'src/seed/interfaces/content.class.interface';
/* netoSpirit  */
export class CreateLpmDto {

  @IsString()
  titulo: string;

  @IsString()
  @IsOptional()
  titulo2?: string;

  @IsString()
  subtitulo: string;

  @IsString()
  @IsOptional()
  panel?: string;

  @IsString()
  seccion: string;

  @IsArray()
  @ValidateNested()
  @Type(() => ContentImagesLpm)
  ingreso?: ContentImagesLpm[];

  @IsArray()
  @ValidateNested()
  @Type(() => ContentImagesLpm)
  contenido: ContentImagesLpm[];

}
