import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsIn(['user', 'admin'], { message: 'El rol debe ser user o admin' })
  roles: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  pais?: string;

  @IsString()
  @IsOptional()
  ciudad?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
/*   @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  }) */
  password: string;
}
