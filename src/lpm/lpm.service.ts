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
            contenido.imagesUrl,
          ))
        ) {
          /* imagen Unknown pordefecto, si se borra en cloudinary solo indicar el nuevo url y el publicImg */
          return {
            subtitles: contenido.subtitles,
            imagesUrl:
              'https://res.cloudinary.com/dndimul42/image/upload/v1681839890/xz5trjdzo0pobxnibl7z.jpg',
            publicIdImage: 'xz5trjdzo0pobxnibl7z',
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

  async deleteImagesForUpdate(
    id: string,
    manager: EntityManager,
    ingreso: ContentImagesLpm[],
    contenido: ContentImagesLpm[],
  ) {
    const deletePromises = [];
    const deletePublicsId = [];
    if (contenido) {
      contenido.forEach((content) => {
        deletePublicsId.push(content.publicIdImage);
      });
      deletePromises.push(manager.delete(LpmContentImages, { contenido: id }));
    }

    if (ingreso) {
      ingreso.forEach((content) => {
        deletePublicsId.push(content.publicIdImage);
      });
      deletePromises.push(
        manager.delete(LpmContentImagesIngreso, { ingreso: id }),
      );
    }

    /* envío el arreglo de publicsId a borrar */
    await this.cloudinary.deleteImagesCloudByError(deletePublicsId);

    await Promise.all(deletePromises);
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
      this.cloudinary.deleteImagesCloudByError(this.imagenesEnCaliente);
      this.imagenesEnCaliente = [];
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
      if (contenido || ingreso) {
        await this.deleteImagesForUpdate(
          id,
          queryRunner.manager,
          ingreso,
          contenido,
        );
      }

      if (contenido) {
        contenido = await this.createFilesCloudinary(contenido);
        section.contenido = this.createEntityFiles(
          contenido,
          this.lpmImageRepository,
        );
      }

      if (ingreso) {
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

    await this.cloudinary.deleteImagesCloudByError(idsContenido);
    await this.cloudinary.deleteImagesCloudByError(idsIngreso);
    await this.lpmRepository.remove(section);
    if (!section) throw new NotFoundException(`id ${id} dont exist`);
    return section;
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
