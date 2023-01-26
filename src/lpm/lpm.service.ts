import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateLpmDto } from './dto/create-lpm.dto';
import { CreateContentSectionDto } from './dto/create-section.dto';
import { UpdateLpmDto } from './dto/update-lpm.dto';
import { Lpm, LpmContentImages, LpmContentImagesIngreso } from './entities'
import { validate as validUuid } from 'uuid';


@Injectable()
export class LpmService {

  constructor(
    @InjectRepository(Lpm) private lpmRepository: Repository<Lpm>,
    @InjectRepository(LpmContentImages) private lpmImageRepository: Repository<LpmContentImages>,
    @InjectRepository(LpmContentImagesIngreso) private lpmIngresoRepository: Repository<LpmContentImagesIngreso>,
    private dataSource: DataSource) { }

  async createSection(infoSection: CreateLpmDto) {
    let { contenido, ingreso, ...infoRest } = infoSection;
    /*   contenido.forEach(img => this.LpmImageRepository.create({ subtitles: img.subtitles, imagesUrl: img.imagesUrl }));
   */
    try {
      const section: Lpm = this.lpmRepository.create(
        {
          ...infoRest,
          contenido: contenido.map(content => this.lpmIngresoRepository.create({ subtitles: content.subtitles, imagesUrl: content.imagesUrl })),
          ingreso: ingreso.map(content => this.lpmIngresoRepository.create({ subtitles: content.subtitles, imagesUrl: content.imagesUrl }))
        }
      );
      console.log(section)
      await this.lpmRepository.save(section);
      return section;

    } catch (error) {
      this.handlerError(error);
    }

  }

  /* POR FAVOR LEER ESTA PARTE AL PROBAR EL UPDATE */
  /* suponiendo que le envío todo el objeto de nuevo de imagenes contando las anteriores */


  /*   async updateSection(updateSectionDto: UpdateLpmDto, id: string) {
    let { contenido = [], ...restContent } = updateSectionDto;
    const section = await this.lpmRepository.preload({ id, ...updateSectionDto });
    if (!section) throw new NotFoundException(`${id} dont exist`);
    const queryRunner = this.dataSource.createQueryRunner();
    console.log(section)
    queryRunner.connect();
    queryRunner.startTransaction();
    try {
      if (contenido) {
            await queryRunner.manager.save()
      }
    } catch (error) {

    }
    return section
  } */


  async addContentSect(infoContent: CreateContentSectionDto, termino: string) {
    return "no es "
    /*   const section = await this.lpmRepository.findOneBy({ titulo: termino });
  
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
  
      return section; */
  }



  async findAll() {
    const section = await this.lpmRepository.find();
    return section;
  };

  async findOne(id: string) {
    let section !: Lpm;
    if (validUuid(id)) {
      section = await this.lpmRepository.findOneBy({ id });
    }
    if (!section) {
      section = await this.lpmRepository.findOneBy({ titulo: id });
    }
    if (!section) {
      section = await this.lpmRepository.findOneBy({ seccion: id })
    }
    if (!section) throw new NotFoundException(`${id} dont exist`);
    return section;
  };


  async findManyTitles(termino: string) {
    let title!: Lpm[];
    const queryBuilder = this.lpmRepository.createQueryBuilder('prod');
    title = await queryBuilder.where(`titulo ilike :termino`, {
      termino: `%${termino}%`
    }).getMany();
    if (!title) throw new NotFoundException(`${termino} dont exist`);
    return title;
  }

  async findManySections(termino: string) {
    let section!: Lpm[];
    const queryBuilder = this.lpmRepository.createQueryBuilder('prod');
    section = await queryBuilder.where(`seccion =:termino`, {
      termino: `${termino}`
    }).getMany();
    if (!section) throw new NotFoundException(`${termino} dont exist`);
    return section;
  }

  remove(id: number) {
    return `This action removes a #${id} lpm`;
  }

  handlerError(error: any) {
    if (error.code === "23505") {
      throw new BadRequestException(error.detail)
    }

  };
}
