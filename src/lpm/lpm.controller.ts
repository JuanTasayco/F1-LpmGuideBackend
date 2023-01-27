import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { LpmService } from './lpm.service';
import { CreateLpmDto } from './dto/create-lpm.dto';


@Controller('lpm')
export class LpmController {
  constructor(private readonly lpmService: LpmService) { }

  @Post()
  addSection(@Body() infoSection: CreateLpmDto) {
    return this.lpmService.createSection(infoSection);
  }

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

  @Delete(":id")
  deleteSection(@Param("id", ParseUUIDPipe) id: string) {
    return this.lpmService.deleteSection(id);
  }


}
