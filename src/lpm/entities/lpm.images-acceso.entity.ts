import { BeforeInsert, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lpm } from "./lpm.entity";

@Entity()
export class LpmContentImagesIngreso {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: "text" })
    subtitles: string;

    @Column({ type: "text" })
    imagesUrl?: string;

    @ManyToOne(
        () => Lpm,
        (section) => section.ingreso,
        { cascade: true }
    )
    ingreso: Lpm;

    @BeforeInsert()
    insertImagesUrl() {
        if (!this.imagesUrl) {
            console.log("holasas");
            this.imagesUrl = "unknown"
        }
    }

}