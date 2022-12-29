import { Injectable } from '@nestjs/common';
import { CreateLpmDto } from './dto/create-lpm.dto';
import { UpdateLpmDto } from './dto/update-lpm.dto';

@Injectable()
export class LpmService {
  create(createLpmDto: CreateLpmDto) {
    return 'This action adds a new lpm';
  }


  findAsistencias() {
    return `This action returns a asistencias lpm`
  }

  findEspeciales() {
    return `This action returns a especiales lpm`
  }

  findMantenimiento() {
    return `This action returns a mantenimiento lpm`
  }

  findRegistros() {
    return `This action returns a registros lpm`
  }



  findOne(id: number) {
    return `This action returns a #${id} lpm`;
  }

  update(id: number, updateLpmDto: UpdateLpmDto) {
    return `This action updates a #${id} lpm`;
  }

  remove(id: number) {
    return `This action removes a #${id} lpm`;
  }
}
