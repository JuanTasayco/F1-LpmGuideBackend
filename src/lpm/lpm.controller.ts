import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LpmService } from './lpm.service';
import { CreateLpmDto } from './dto/create-lpm.dto';
import { UpdateLpmDto } from './dto/update-lpm.dto';

@Controller('lpm')
export class LpmController {
  constructor(private readonly lpmService: LpmService) { }

  @Post()
  create(@Body() createLpmDto: CreateLpmDto) {
    return this.lpmService.create(createLpmDto);
  }

  @Get('/asistencias')
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


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lpmService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLpmDto: UpdateLpmDto) {
    return this.lpmService.update(+id, updateLpmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lpmService.remove(+id);
  }
}
