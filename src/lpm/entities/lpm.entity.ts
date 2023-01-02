
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LpmContentImages } from "./lpm.images.entity";

@Entity()
export class Lpm {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "text", unique: true })
    titulo: string;

    @Column({ type: "text", nullable: true })
    titulo2?: string;

    @Column({ type: "text" })
    subtitulo: string;

    @Column({ type: "text", nullable: true })
    panel?: string;

    @Column({ type: "text" })
    seccion: string;

    @Column({ type: "text", array: true })
    ingreso?: LpmContentImages[];


    @OneToMany(
        () => LpmContentImages,
        (lpmImage) => lpmImage.section,
        { cascade: true, eager: true }
    )
    contenido?: LpmContentImages[];

    /*     @OneToMany(
            () => LpmContentImages,
            (lpmImage) => lpmImage.sectIn,
        )
    
        */

}
