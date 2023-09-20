import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner, Repository } from 'typeorm';
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

  imagenesEnCaliente: string[] = [];

  async createFilesCloudinary(objetoImagenes: ContentImagesLpm[]) {
    try {
      const setUrlToArray = objetoImagenes.map(async (contenido) => {
        if (await this.cloudinary.validateBase64(contenido.imagesUrl)) {
          /* create */
          /* si la validación base 64 es true */
          const { secure_url, public_id } =
            await this.cloudinary.uploadImageBase64(contenido.imagesUrl);
          this.imagenesEnCaliente.push(public_id);
          return {
            subtitles: contenido.subtitles,
            imagesUrl: secure_url,
            publicIdImage: public_id,
          };
        } else if (
          contenido.imagesUrl.trim() == '' ||
          !(await this.cloudinary.validateResourceCloudinary(
            contenido.publicIdImage,
          ))
        ) {
          /* imagen Unknown pordefecto, si se borra en cloudinary solo indicar el nuevo url y el publicImg */
          return {
            subtitles: contenido.subtitles,
            imagesUrl:
              'https://res.cloudinary.com/dndimul42/image/upload/v1681839890/lpm/b9janghwwhy6agr5nj9x.jpg',
            publicIdImage: 'b9janghwwhy6agr5nj9x',
          };
        } else {
          return {
            subtitles: contenido.subtitles,
            imagesUrl: contenido.imagesUrl,
            publicIdImage: contenido.publicIdImage,
          };
        }
      });

      return await Promise.all(setUrlToArray);
    } catch (error) {
      this.handlerError(error);
    }
  }

  createEntityFiles(
    array: ContentImagesLpm[],
    repository: Repository<LpmContentImagesIngreso | LpmContentImages>,
  ): any {
    return array.map((content) =>
      repository.create({
        subtitles: content.subtitles,
        imagesUrl: content.imagesUrl,
        publicIdImage: content.publicIdImage,
      }),
    );
  }

  /* ======================================================== */
  /* methos for controllers */

  async createSection(infoSection: CreateLpmDto) {
    let { contenido = [], ingreso = [], ...infoRest } = infoSection;

    try {
      contenido = await this.createFilesCloudinary(contenido);
      ingreso = await this.createFilesCloudinary(ingreso);

      const seccion = this.lpmRepository.create({
        ...infoRest,
        ingreso: this.createEntityFiles(ingreso, this.lpmIngresoRepository),
        contenido: this.createEntityFiles(contenido, this.lpmImageRepository),
      });

      await this.lpmRepository.save(seccion);
      this.imagenesEnCaliente = [];
      return seccion;
    } catch (error) {
      this.cloudinary.deleteImagesCloud(this.imagenesEnCaliente);
      this.imagenesEnCaliente = [];
      console.log(error);
      this.handlerError(error);
    }
  }

  async findAll() {
    try {
      const section = await this.lpmRepository.find();
      return section;
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findAllSections() {
    try {
      const results = await this.lpmRepository.find();
      const sections = Array.from(
        new Set(results.map((result) => result.seccion)),
      );

      return sections;
    } catch (error) {
      this.handlerError(error);
    }
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
    console.log(termino);
    const queryBuilder = this.lpmRepository.createQueryBuilder('prod');
    section = await queryBuilder
      .where(`seccion =:termino`, {
        termino: `${termino}`,
      })
      .getMany();
    console.log(section);
    if (!section || section.length == 0)
      throw new NotFoundException(`${termino} dont exist`);
    return section;
  }

  getIdClouds(items: ContentImagesLpm[]) {
    return items?.map((item) => item.publicIdImage).filter(Boolean) || [];
  }

  async updateSectionById(id: string, updateDto: UpdateLpmDto) {
    let { ingreso, contenido, ...updateInfo } = updateDto;

    const section = await this.lpmRepository.preload({ id, ...updateInfo });
    if (!section) throw new NotFoundException(`id ${id} dont exist`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (contenido) {
        await queryRunner.manager.delete(LpmContentImages, { contenido: id });
        contenido = await this.createFilesCloudinary(contenido);
        section.contenido = this.createEntityFiles(
          contenido,
          this.lpmImageRepository,
        );
      }

      if (ingreso) {
        await queryRunner.manager.delete(LpmContentImagesIngreso, {
          ingreso: id,
        });
        ingreso = await this.createFilesCloudinary(ingreso);
        section.ingreso = this.createEntityFiles(
          ingreso,
          this.lpmIngresoRepository,
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
    let { contenido, ingreso } = section;

    const idsContenido = contenido.map((content) => content.publicIdImage);
    const idsIngreso = ingreso.map((content) => content.publicIdImage);

    await this.cloudinary.deleteImagesCloud(idsContenido);
    await this.cloudinary.deleteImagesCloud(idsIngreso);
    await this.lpmRepository.remove(section);
    if (!section) throw new NotFoundException(`id ${id} dont exist`);
    return section;
  }

  async deleteCloudinaryImages(images: string[]) {
    await this.cloudinary.deleteImagesCloud(images);
    return {
      value: 'ok',
      msg: 'imagenes destruidas',
    };
  }

  /* method for errors */
  handlerError(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(
        'El título especificado ya existe, por favor verificalo',
      );
    }
    console.log(error);
    return error;
  }
}
