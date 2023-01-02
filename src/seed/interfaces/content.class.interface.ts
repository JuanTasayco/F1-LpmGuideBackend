/* interfaz clase usada para validar el arreglo de objetos del DTO, especificamente para la entidad imagenesLpm */

import { IsString } from "class-validator";


export class ContentImagesLpm {

    @IsString()
    subtitles: string;

    @IsString()
    imagesUrl: string;

}