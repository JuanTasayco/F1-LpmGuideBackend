import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService) { }

  async create(createAuthDto: CreateAuthDto) {
    const { password, ...rest } = createAuthDto;
    try {

      const user = await this.userRepository.create({
        ...rest,
        password: bcrypt.hashSync(password, 10)
      });
      await this.userRepository.save(user);

      return {
        ...user,
        token: this.getJwt({ id: user.id })
      };

    } catch (error) {
      this.errors(error);
    }
    return 'This action adds a new auth';
  }



  private getJwt(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }


  async login(bodyLoginDto: CreateAuthDto) {
    const { password, email } = bodyLoginDto;
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        select: { password: true, email: true, id: true }
      })

      if (!user) throw new BadRequestException(`Email ${email} dont exist`);

      /* comparación de contraseñas */

      if (!bcrypt.compareSync(password, user.password)) throw new BadRequestException(`Password ${password} dont exist`);

      return {
        ...user,
        token: this.getJwt({ id: user.id })
      }

    } catch (error) {
      this.errors(error);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  errors(error: any) {
    if (error.code == "23505") {
      throw new NotFoundException(`${error.detail}`)
    }
    throw new InternalServerErrorException(error.message)
  }

}
