import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeedService } from 'src/seed/seed.service';
import { DataSource, Repository } from 'typeorm';
import { CreateLpmDto } from './dto/create-lpm.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { UpdateLpmDto } from './dto/update-lpm.dto';
import { Lpm, LpmContentImages } from './entities'
import { query } from 'express';


@Injectable()
export class LpmService {

  constructor(
    private seedService: SeedService,
    @InjectRepository(Lpm) private lpmRepository: Repository<Lpm>,
    @InjectRepository(LpmContentImages) private LpmImageRepository: Repository<LpmContentImages>,
    private dataSource: DataSource) { }


  private logger = new Logger("LpmService")

  async createAllSection(createLpmDto: CreateLpmDto) {
    let { contenido = [], ...infoRest } = createLpmDto;
    try {
      const section = this.lpmRepository.create(
        {
          ...infoRest,
          contenido: contenido.map(img => this.LpmImageRepository.create({ subtitles: img.subtitles, imagesUrl: img.imagesUrl }))
        }
      );

      await this.lpmRepository.save(section);
      return section;

    } catch (error) {
      this.handlerError(error);
    }
  }


  async createInfoForSection(imagesLpm: UpdateSectionDto, termino: string) {

    const section = await this.lpmRepository.findOneBy({ titulo: termino });
    let { contenido, ...restSection } = section
    if (!section) throw new NotFoundException(`${termino} dont exist`);

    let imagenes: LpmContentImages[] = Object.values(imagesLpm).flat();

    imagenes = imagenes.map(imagen => this.LpmImageRepository.create({ imagesUrl: imagen.imagesUrl, subtitles: imagen.subtitles }))
    imagenes.forEach(imagen => { section.contenido.push(imagen) })
    console.log(section)
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {

      await queryRunner.manager.save(section);
      await queryRunner.commitTransaction();

    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handlerError(error);

    } finally {
      await queryRunner.release();
    }

    /* tiene que ser de tipo lpmContentImage */







    return section;

  }


  handlerError(error: any) {
    if (error.code === "23505") {
      throw new BadRequestException(error.detail)
    }

    /*     throw new InternalServerErrorException("Unexpected error,check server logs"); */

  }


  async findAll() {
    const section = await this.lpmRepository.find();
    return section;
  }


  /* GET METHODS */
  findAsistencias() {
    return this.seedService.executeAsistencias();
  }

  findEspeciales() {
    return this.seedService.executeEspeciales();
  }

  findMantenimiento() {
    return this.seedService.executeMantenimiento();
  }

  findRegistros() {
    return this.seedService.executeRegistros();
  }


  /* 
    findOne(id: number) {
      return `This action returns a #${id} lpm`;
    }
  
    update(id: number, updateLpmDto: UpdateLpmDto) {
      return `This action updates a #${id} lpm`;
    }
  
    remove(id: number) {
      return `This action removes a #${id} lpm`;
    } */
}
