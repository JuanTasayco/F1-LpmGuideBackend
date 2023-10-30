import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', default:'usuario' })
  nombre: string;

  @Column({ type: 'text', default: '' })
  apellido: string;

  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', default: '' })
  direccion: string;

  @Column({ type: 'text', default: '' })
  pais: string;

  @Column({ type: 'text', default: '' })
  ciudad: string;

  /* solo puede haber user o admin */
  @Column({ type: 'text', default: 'user' })
  roles: string;

  @Column({ type: 'text', default: '' })
  imagenUrl: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  /* propiedades que se manejan por debajo */
  @Column({ type: 'boolean', nullable: false, default: true })
  isActive: boolean;
}
