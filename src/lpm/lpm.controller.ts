import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { LpmService } from './lpm.service';
import { CreateLpmDto } from './dto/create-lpm.dto';
import { UpdateLpmDto } from './dto/update-lpm.dto';

import { AnyFilesInterceptor } from '@nestjs/platform-express/multer';
import {
  fileFilter,
  FileValidationErrors,
} from 'src/helpers/fileFilter.helper';
import { BadRequestException } from '@nestjs/common/exceptions';

@Controller('lpm')
export class LpmController {
  constructor(private readonly lpmService: LpmService) {}

  @Post()
  addSection(@Body() infoSection: CreateLpmDto) {
    return this.lpmService.createSection(infoSection);
  }

  @Post('files')
  @UseInterceptors(
    AnyFilesInterceptor({
      fileFilter: fileFilter,
    }),
  )
  addFilesSection(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any,
    @Req() request: any,
  ) {
    /*   if (
      request.fileValidationError === FileValidationErrors.UNSUPPORTED_FILE_TYPE
    ) {
      throw new BadRequestException(`El tipo de archivo no es permitido`);
    } */
    /*    return this.lpmService.createFilesSection(files); */
    console.log(body);
    console.log(files);
  }

  @Get()
  findAll() {
    return this.lpmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lpmService.findOne(id);
  }

  @Get('titles/:id')
  findMany(@Param('id') id: string) {
    return this.lpmService.findManyTitles(id);
  }

  @Get('sections/:id')
  findOnlySections(@Param('id') id: string) {
    return this.lpmService.findManySections(id);
  }

  @Patch('section/:id')
  updateSection(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSection: UpdateLpmDto,
  ) {
    return this.lpmService.updateSectionById(id, updateSection);
  }

  @Delete('section/:id')
  deleteSection(@Param('id', ParseUUIDPipe) id: string) {
    return this.lpmService.deleteSection(id);
  }
}
