import { Injectable } from '@nestjs/common';
import { asistencias, especiales, mantenimiento, registros } from "./data/lpmsections";

@Injectable()
export class SeedService {

  executeAsistencias() {
    return asistencias;
  }

  executeEspeciales() {
    return especiales;
  }

  executeMantenimiento() {
    return mantenimiento;
  }

  executeRegistros() {
    return registros;
  }
  findAll() {
    return `This action returns all seed`;
  }
}
