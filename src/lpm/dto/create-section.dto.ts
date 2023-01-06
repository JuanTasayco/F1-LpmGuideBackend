import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { ContentImagesLpm } from "src/seed/interfaces/content.class.interface";


export class CreateContentSectionDto {
    @IsArray()
    @ValidateNested()
    @Type(() => ContentImagesLpm)
    contenido: ContentImagesLpm[];
} 