import { PartialType } from '@nestjs/mapped-types';
import { CreateLpmDto } from './create-lpm.dto';

export class UpdateLpmDto extends PartialType(CreateLpmDto) {}
