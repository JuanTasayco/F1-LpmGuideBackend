import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LpmService } from './lpm.service';
import { CreateLpmDto } from './dto/create-lpm.dto';
import { UpdateLpmDto } from './dto/update-lpm.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Controller('lpm')
export class LpmController {
  constructor(private readonly lpmService: LpmService) { }

  @Post()
  createSection(@Body() createLpmDto: CreateLpmDto) {
    return this.lpmService.createAllSection(createLpmDto);
  }

  @Patch(':id')
  create(@Body() createLpmDto: UpdateSectionDto, @Param("id") termino: string) {
    return this.lpmService.createInfoForSection(createLpmDto, termino);
  }

  @Get()
  findAll() {
    return this.lpmService.findAll();
  }

  @Get('asistencias')
  findAsist() {
    return this.lpmService.findAsistencias();
  }

  @Get('especiales')
  findMant() {
    return this.lpmService.findEspeciales();
  }

  @Get('mantenimiento')
  findEsp() {
    return this.lpmService.findMantenimiento();
  }

  @Get('registros')
  findReg() {
    return this.lpmService.findRegistros();
  }



}
