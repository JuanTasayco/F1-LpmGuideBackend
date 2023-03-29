import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
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
    const { email, id } = payload;
    const queryBuilder = this.userRepository.createQueryBuilder();
    const user = await queryBuilder
      .where(`id=:id or email=:email`, {
        id,
        email,
      })
      .getOne();

    if (!user) throw new UnauthorizedException(`Token not valid`);

    if (!user.isActive)
      throw new BadRequestException(
        `User is inactive, pls comunicate with admins `,
      );
    return user;
  }
}
