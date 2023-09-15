import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { LpmService } from './lpm.service';
import { CreateLpmDto } from './dto/create-lpm.dto';
import { UpdateLpmDto } from './dto/update-lpm.dto';

@Controller('lpm')
export class LpmController {
  constructor(private readonly lpmService: LpmService) {}

  @Post()
  addSection(@Body() infoSection: CreateLpmDto) {
    return this.lpmService.createSection(infoSection);
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

  @Get('sections/all')
  findSections() {
    return this.lpmService.findAllSections();
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

  /* this methos is used for eliminated independent images in blocks (subtitles and imagesUrl) */
  @Post('delete/cloudimage')
  deleteCloudinaryImages(@Body() publicIds: string[]) {
    return this.lpmService.deleteCloudinaryImages(publicIds);
  }
}
