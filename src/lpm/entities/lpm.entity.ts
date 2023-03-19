import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LpmContentImagesIngreso, LpmContentImages } from './';

@Entity()
export class Lpm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  titulo2?: string;

  @Column({ type: 'text' })
  subtitulo: string;

  @Column({ type: 'text', nullable: true })
  panel?: string;

  @Column({ type: 'text' })
  seccion: string;

  @OneToMany(
    () => LpmContentImagesIngreso,
    (lpmImageIngreso) => lpmImageIngreso.ingreso,
    { eager: true, cascade: true },
  )
  ingreso?: LpmContentImagesIngreso[];

  @OneToMany(() => LpmContentImages, (lpmImage) => lpmImage.contenido, {
    eager: true,
    cascade: true,
  })
  contenido: LpmContentImages[];
}
