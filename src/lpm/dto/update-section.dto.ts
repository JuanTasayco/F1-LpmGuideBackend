import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsArray, IsString, IsOptional, ValidateNested } from "class-validator";
import { ContentImagesLpm } from "src/seed/interfaces/content.class.interface";
import { CreateLpmDto } from "./create-lpm.dto";


export class UpdateSectionDto extends PartialType(CreateLpmDto) {

    @IsArray()
    @ValidateNested()
    @Type(() => ContentImagesLpm)
    contenido: ContentImagesLpm[];

}
