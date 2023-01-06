import { PartialType } from "@nestjs/mapped-types";
import { CreateContentSectionDto } from "./create-section.dto";


export class UpdateSectionDto extends PartialType(CreateContentSectionDto) {
}
