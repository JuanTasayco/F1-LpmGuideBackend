import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lpm } from "./lpm.entity";

@Entity()
export class LpmContentImages {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: "text", default: "" })
    subtitles: string;

     @Column({ type: "text", default: "" })
     imagesUrl: string;
 

    @ManyToOne(
        (type) => Lpm,
        (section) => section.contenido,
    )
    section: Lpm;

    /*     @ManyToOne(
            () => Lpm,
            (section) => section.ingreso,
        )
        sectIn: Lpm;
     */
}