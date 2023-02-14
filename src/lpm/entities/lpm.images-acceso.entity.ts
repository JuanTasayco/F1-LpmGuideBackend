import { BeforeInsert, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lpm } from "./lpm.entity";

@Entity()
export class LpmContentImagesIngreso {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    subtitles: string;

    @Column({ type: "text", nullable: true, default: "" })
    imagesUrl: string;

    @ManyToOne(
        () => Lpm,
        (section) => section.ingreso,
        { onDelete: 'CASCADE' }
    )
    ingreso: Lpm;

}