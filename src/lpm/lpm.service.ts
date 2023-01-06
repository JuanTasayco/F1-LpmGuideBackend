import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeedService } from 'src/seed/seed.service';
import { DataSource, Repository } from 'typeorm';
import { CreateLpmDto } from './dto/create-lpm.dto';
import { CreateContentSectionDto } from './dto/create-section.dto';
import { UpdateLpmDto } from './dto/update-lpm.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Lpm, LpmContentImages } from './entities'



@Injectable()
export class LpmService {

  constructor(
    @InjectRepository(Lpm) private lpmRepository: Repository<Lpm>,
    @InjectRepository(LpmContentImages) private LpmImageRepository: Repository<LpmContentImages>,
    private dataSource: DataSource) { }


  private logger = new Logger("LpmService");



  async createSection(infoSection: CreateLpmDto) {
    let { contenido = [], ...infoRest } = infoSection;
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

  /* POR FAVOR LEER ESTA PARTE AL PROBAR EL UPDATE */
  /* suponiendo que le envío todo el objeto de nuevo de imagenes contando las anteriores */
  async updateSection(updateSectionDto: UpdateLpmDto, id: string) {

    let { contenido = [], ...restContent } = updateSectionDto;
    const section = await this.lpmRepository.preload({ id, ...updateSectionDto });
    if (!section) throw new NotFoundException(`${id} dont exist`);

    const queryRunner = this.dataSource.createQueryRunner();
    console.log(section)
    /*     queryRunner.connect();
        queryRunner.startTransaction(); */
    try {
      if (contenido) {
        /*     await queryRunner.manager.save() */
      }

    } catch (error) {

    }

    return section
  }



  /* permition add section */
  async addContentSect(infoContent: CreateContentSectionDto, termino: string) {

    const section = await this.lpmRepository.findOneBy({ titulo: termino });

    let { contenido = [], ...restSection } = section
    if (!section) throw new NotFoundException(`${termino} dont exist`);

    let imagenes: LpmContentImages[] = Object.values(infoContent).flat();

    imagenes = imagenes.map(imagen => this.LpmImageRepository.create({ imagesUrl: imagen.imagesUrl, subtitles: imagen.subtitles }))
    imagenes.forEach(imagen => { section.contenido.push(imagen) })

    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(section);
      await queryRunner.commitTransaction();

    } catch (error) {

      await queryRunner.rollbackTransaction();
      this.handlerError(error);

    } finally { await queryRunner.release(); }

    return section;
  }


  /*   updateContentSect(newInfoContent, termino: string) {
  
    } */

  async findAll() {
    const section = await this.lpmRepository.find();
    return section;
  }

  handlerError(error: any) {
    if (error.code === "23505") {
      throw new BadRequestException(error.detail)
    }
    /*     throw new InternalServerErrorException("Unexpected error,check server logs"); */
  }

  /* GET METHODS */



  async findOne(id: string) {
    const section = await this.lpmRepository.findOneBy({ titulo: id });
    if (!section) throw new NotFoundException(`${id} dont exist`);
    return section;
  }

  /* 
  remove(id: number) {
    return `This action removes a #${id} lpm`;
  } */
}
