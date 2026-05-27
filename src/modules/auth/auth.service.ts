import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { AppError } from 'back/src/shared/erros/app-erros';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    try {
      const user = await this.usersService.findByEmail(dto.email);

      if (!user) {
        throw new UnauthorizedException('E-mail ou senha inválidos');
      }

      const passwordMatch = await bcrypt.compare(dto.password, user.password);

      if (!passwordMatch) {
        throw new UnauthorizedException('E-mail ou senha inválidos');
      }

      const payload = {
        sub: user.id,
        email: user.email,
      };

      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      console.log(error);

      throw new AppError('Erro ao logar', 400);
    }
  }
}
