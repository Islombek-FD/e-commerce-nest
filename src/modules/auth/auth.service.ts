import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { STATUS } from '@/common/enums';
import { JwtPayload } from '@/modules/auth/dto/jwt.payload';
import { UserService } from '@/modules/users/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.userService.findByUsername(dto.username);
    if (existing) throw new UnauthorizedException('Username already taken');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.create({
      firstName: '',
      lastName: '',
      middleName: '',
      username: '',
      password: '',
      roleId: 1,
      status: STATUS.ACTIVE,
    });

    return this.generateTokens(new JwtPayload());
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByUsername(dto.username);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role.name,
      permissions: user.role.permissions,
    };
    return this.generateTokens(payload);
  }

  async refreshTokens(oldRefreshToken: string) {
    try {
      const payload: JwtPayload = this.jwtService.verify(oldRefreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const user = await this.userService.findById(payload.sub);
      return this.generateTokens(payload);
    } catch (err) {
      throw new UnauthorizedException('Token invalid or expired');
    }
  }

  private generateTokens(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  private generateRefreshToken(userId: number) {
    return this.jwtService.sign(
      { sub: userId },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
    );
  }
}
