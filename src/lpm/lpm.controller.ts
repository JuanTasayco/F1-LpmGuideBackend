import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { LpmService } from './lpm.service';
import { CreateLpmDto } from './dto/create-lpm.dto';
import { UpdateLpmDto } from './dto/update-lpm.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { CreateContentSectionDto } from './dto/create-section.dto';

@Controller('lpm')
export class LpmController {
  constructor(private readonly lpmService: LpmService) { }

  @Get()
  findAll() {
    return this.lpmService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.lpmService.findOne(id);
  }

  @Get("titles/:id")
  findMany(@Param("id") id: string) {
    return this.lpmService.findManyTitles(id);
  }

  @Get("sections/:id")
  findOnlySections(@Param("id") id: string) {
    return this.lpmService.findManySections(id);
  }

  @Post()
  addSection(@Body() infoSection: CreateLpmDto) {
    return this.lpmService.createSection(infoSection);
  }

  /*   @Patch('section/:id')
    updateSection(@Body() newInfoSection: UpdateLpmDto, @Param("id", ParseUUIDPipe) termino: string) {
      return this.lpmService.updateSection(newInfoSection, termino);
    } */

  /*  @Post(':id')
   addContentSection(@Body() infoContent: CreateContentSectionDto, @Param("id") termino: string) {
     return this.lpmService.addContentSect(infoContent, termino);
   } */

  @Delete(":id")
  deleteSection() {

  }

  /* no me parece necesario porque el update section de por sí me trae toda la info, guarda el objeto y lo envía incluyendo el contenido */
  /* @Patch(':id')
  updateContentSection(@Body() newInfoContent: UpdateSectionDto, @Param("id") termino: string) {
    return this.lpmService.updateContentSect(newInfoContent, termino);
  } */

}
