import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lpm } from './lpm.entity';

@Entity()
export class LpmContentImages {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  subtitles: string;

  @Column({ type: 'text', nullable: true, default: '' })
  imagesUrl: string;

  @Column({ type: 'text', default: '' })
  publicIdImage?: string;

  @ManyToOne(() => Lpm, (section) => section.contenido, { onDelete: 'CASCADE' })
  contenido: Lpm;
}
