import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/auth.entity';
import { JwtPayload } from '../interfaces/jwt-payload';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    const { email, user, id } = payload;
    const queryBuilder = this.userRepository.createQueryBuilder();
    const userActive = await queryBuilder
      .where(`id=:id or email=:email or user=:user `, {
        id,
        email,
        user,
      })
      .getOne();

    if (!userActive) throw new UnauthorizedException(`Token not valid`);
    if (!userActive.isActive)
      throw new BadRequestException(`User is inactive, pls comunicate `);
    return userActive;
  }
}
