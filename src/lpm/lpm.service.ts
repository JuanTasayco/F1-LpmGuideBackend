import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateLpmDto } from './dto/create-lpm.dto';
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
    let { contenido = [], ...infoRest } = infoSection;
    try {
      const seccion = this.lpmRepository.create({
        ...infoRest,
        contenido: contenido.map(content => this.lpmImageRepository.create({ subtitles: content.subtitles, imagesUrl: content.imagesUrl }))
      })
      console.log(seccion)
      console.log(await this.lpmRepository.save(seccion))

    } catch (error) {
      this.handlerError(error);
    }

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

    console.log(error)
  };
}
