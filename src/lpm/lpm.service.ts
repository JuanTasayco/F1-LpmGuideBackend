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
        console.log(await this.cloudinary.validateBase64(contenido.imagesUrl));
        if (!(await this.cloudinary.validateBase64(contenido.imagesUrl))) {
          const { secure_url, public_id } =
            await this.cloudinary.uploadImageBase64(contenido.imagesUrl);
          console.log(
            'ESTOY ENTRANDO A LA CONDICIONAL DE HAY IMAGENES Y USO API',
          );

          this.imagenesEnCaliente.push(public_id);
          return {
            subtitles: contenido.subtitles,
            imagesUrl: secure_url,
            publicIdImage: public_id,
          };
        } else {
          console.log('ESTOY ENTRANDO A LA CONDICIONAL DE NO ES BASE 64');
          return {
            subtitles: contenido.subtitles,
            imagesUrl: contenido.imagesUrl,
            publicIdImage: contenido.imagesUrl,
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

    if (contenido) {
      deletePromises.push(manager.delete(LpmContentImages, { contenido: id }));
    }

    if (ingreso) {
      deletePromises.push(
        manager.delete(LpmContentImagesIngreso, { ingreso: id }),
      );
    }

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

      return seccion;
    } catch (error) {
      this.cloudinary.deleteImagesCloudByError(this.imagenesEnCaliente);
      this.imagenesEnCaliente = [];
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
        console.log('contenido0', contenido);
        contenido = await this.createFilesCloudinary(contenido);
        /*  console.log('contenido1', contenido); */
        section.contenido = this.createEntityFiles(
          contenido,
          this.lpmImageRepository,
        );
      }

      if (ingreso) {
        ingreso = await this.createFilesCloudinary(ingreso);
        console.log('ingreso', ingreso);
        section.ingreso = this.createEntityFiles(
          ingreso,
          this.lpmIngresoRepository,
        );
      }

      await queryRunner.manager.save(section);
      console.log('new section', section);
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
