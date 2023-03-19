import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateLpmDto } from './dto/create-lpm.dto';
import { Lpm, LpmContentImages, LpmContentImagesIngreso } from './entities';
import { validate as validUuid } from 'uuid';
import { UpdateLpmDto } from './dto/update-lpm.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { ContentImagesLpm } from 'src/seed/interfaces/content.class.interface';

@Injectable()
export class LpmService {
  constructor(
    @InjectRepository(Lpm) private lpmRepository: Repository<Lpm>,
    @InjectRepository(LpmContentImages)
    private lpmImageRepository: Repository<LpmContentImages>,
    @InjectRepository(LpmContentImagesIngreso)
    private lpmIngresoRepository: Repository<LpmContentImagesIngreso>,
    private dataSource: DataSource,
    private cloudinary: CloudinaryService,
  ) {}

  arrayImagesCloud: UploadApiResponse[] | UploadApiErrorResponse[] = [];

  async createFilesSection(objetoImagenes: ContentImagesLpm[]) {
    try {
      const setUrlToArray = objetoImagenes.map(async (contenido) => {
        if (contenido.imagesUrl.trim() === '') {
          return {
            subtitles: contenido.subtitles,
            imagesUrl: '',
          };
        }
        const { secure_url } = await this.cloudinary.uploadImageBase64(
          contenido.imagesUrl,
        );
        return {
          subtitles: contenido.subtitles,
          imagesUrl: secure_url,
        };
      });

      return await Promise.all(setUrlToArray);
    } catch (error) {
      this.handlerError(error);
    }
  }

  async createSection(infoSection: CreateLpmDto) {
    let { contenido = [], ingreso = [], ...infoRest } = infoSection;

    try {
      contenido = await this.createFilesSection(contenido);
      ingreso = await this.createFilesSection(ingreso);

      const seccion = this.lpmRepository.create({
        ...infoRest,
        ingreso: ingreso.map((content) =>
          this.lpmIngresoRepository.create({
            subtitles: content.subtitles,
            imagesUrl: content.imagesUrl,
          }),
        ),
        contenido: contenido.map((content) =>
          this.lpmImageRepository.create({
            subtitles: content.subtitles,
            imagesUrl: content.imagesUrl,
          }),
        ),
      });

      await this.lpmRepository.save(seccion);
      console.log(seccion);
      return seccion;
    } catch (error) {
      console.log(error);
      this.handlerError(error);
    }
  }

  async findAll() {
    const section = await this.lpmRepository.find();
    return section;
  }

  async findOne(id: string) {
    let section!: Lpm;
    if (validUuid(id)) {
      section = await this.lpmRepository.findOneBy({ id });
    }
    if (!section) {
      section = await this.lpmRepository.findOneBy({ titulo: id });
    }
    if (!section) {
      section = await this.lpmRepository.findOneBy({ seccion: id });
    }
    if (!section) throw new NotFoundException(`${id} dont exist`);
    return section;
  }

  async findManyTitles(termino: string) {
    let title!: Lpm[];
    const queryBuilder = this.lpmRepository.createQueryBuilder('prod');
    title = await queryBuilder
      .where(`titulo ilike :termino`, {
        termino: `%${termino}%`,
      })
      .getMany();
    if (!title) throw new NotFoundException(`${termino} dont exist`);
    return title;
  }

  async findManySections(termino: string) {
    let section!: Lpm[];
    const queryBuilder = this.lpmRepository.createQueryBuilder('prod');
    section = await queryBuilder
      .where(`seccion =:termino`, {
        termino: `${termino}`,
      })
      .getMany();
    if (!section) throw new NotFoundException(`${termino} dont exist`);
    return section;
  }

  async updateSectionById(id: string, updateDto: UpdateLpmDto) {
    const { ingreso, contenido, ...updateInfo } = updateDto;
    const section = await this.lpmRepository.preload({ id, ...updateInfo });
    if (!section) throw new NotFoundException(`id ${id} dont exist`);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (ingreso && contenido) {
        await queryRunner.manager.delete(LpmContentImages, { contenido: id });
        await queryRunner.manager.delete(LpmContentImagesIngreso, {
          ingreso: id,
        });
        section.contenido = contenido.map((contenido) =>
          this.lpmImageRepository.create({
            subtitles: contenido.subtitles,
            imagesUrl: contenido.imagesUrl,
          }),
        );
        section.ingreso = ingreso.map((ingreso) =>
          this.lpmIngresoRepository.create({
            subtitles: ingreso.subtitles,
            imagesUrl: ingreso.imagesUrl,
          }),
        );
      } else if (contenido) {
        await queryRunner.manager.delete(LpmContentImages, { contenido: id });
        section.contenido = contenido.map((contenido) =>
          this.lpmImageRepository.create({
            subtitles: contenido.subtitles,
            imagesUrl: contenido.imagesUrl,
          }),
        );
      } else if (ingreso) {
        await queryRunner.manager.delete(LpmContentImagesIngreso, {
          ingreso: id,
        });
        section.ingreso = ingreso.map((ingreso) =>
          this.lpmIngresoRepository.create({
            subtitles: ingreso.subtitles,
            imagesUrl: ingreso.imagesUrl,
          }),
        );
      }

      await queryRunner.manager.save(section);
      await queryRunner.commitTransaction();
      return section;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handlerError(error);
    } finally {
      await queryRunner.release();
    }
  }

  async deleteSection(id: string) {
    const section = await this.findOne(id);
    await this.lpmRepository.remove(section);
    if (!section) throw new NotFoundException(`id ${id} dont exist`);
    return section;
  }

  /* method for errors */
  handlerError(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    return error;
  }
}