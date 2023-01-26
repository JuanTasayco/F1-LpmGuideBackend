import { BeforeInsert, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lpm } from "./lpm.entity";

@Entity()
export class LpmContentImages {

    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ type: "text" })
    subtitles: string;

    @Column({ type: "text" })
    imagesUrl?: string;

    @ManyToOne(
        () => Lpm,
        (section) => section.contenido,
        { cascade: true }
    )
    section: Lpm;

 /*    @BeforeInsert()
    insertImagesUrl() {
        if (!this.imagesUrl) {
            console.log("holasas");
            this.imagesUrl = "unknown"
        }
    } */




}