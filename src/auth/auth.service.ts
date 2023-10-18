import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginAuthDto } from './dto/login-auto.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User as UserEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const { password, ...rest } = createAuthDto;
    try {
      const user = await this.userRepository.create({
        ...rest,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);

      return {
        ...user,
        token: this.getJwt({ id: user.id }),
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

  async login(bodyLoginDto: LoginAuthDto) {
    const { password, email } = bodyLoginDto;
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        select: { password: true, email: true, id: true },
      });

      if (!user)
        throw new BadRequestException(`Email ${email} , no está registrado`);

      /* comparación de contraseñas */

      if (!bcrypt.compareSync(password, user.password))
        throw new BadRequestException(`El Password es incorrecto`);

      return {
        ...user,
        token: this.getJwt({ id: user.id }),
      };
    } catch (error) {
      this.errors(error);
    }
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new BadRequestException(`${id} dont exist`);
    return user;
  }

  async updateUserByID(id: string, body: UpdateAuthDto) {
    console.log(body);
    try {
      let { password, ...rest } = body;
      if (password) body.password = bcrypt.hashSync(password, 10);

      const user = await this.userRepository.preload({ id, ...body });
      if (!user) throw new NotFoundException(`id:${id} dont exist`);

      /*   const { password, ...rest } = user; */
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.errors(error);
    }
  }

  async deleteUser(id: string) {
    const user = await this.findOne(id);
    try {
      this.userRepository.remove(user);
      return true;
    } catch (error) {
      this.errors(error);
    }
  }

  errors(error: any) {
    if (error.code == '23505') {
      throw new NotFoundException(`${error.detail}`);
    }
    throw new InternalServerErrorException(error.message);
  }
}
