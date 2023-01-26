import { Injectable } from '@nestjs/common';
import { LpmService } from 'src/lpm/lpm.service';
import { informacion } from "./data/lpmsections";

@Injectable()
export class SeedService {

  constructor(private lpmService: LpmService) { }

  async executeInfo() {

    const arraySections: any = [];

    informacion.forEach(section => {
      arraySections.push(this.lpmService.createSection(section));
    })

    /*    await Promise.all(arraySections) */

    return "seed executed";
  }

}
