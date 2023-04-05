import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Account, User } from '@prisma/client';
import EnvKey from 'src/common/configs/env';
import { generateHashToken } from 'src/common/helpers';
import { DatabaseService } from 'src/common/services/database.service';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcrypt';

export interface IToken {
  token: string;
  expiredIn: any;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly db: DatabaseService,
  ) {}

  async validateUser(data: LoginDto) {
    const { email, password } = data;
    const account = await this.db.account.findUnique({ where: { email } });
    if (account && compareSync(password, account.password)) {
      return true;
    } else {
      return account;
    }
  }

  async login(account: Account) {
    try {
      const payload = { username: account.email, sub: account.id };
      return this.jwtService.sign(payload);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async logout(user: User) {
    try {
      await this.db.token.delete({ where: { userId: user.id } });
      return true;
    } catch (error) {
      throw error;
    }
  }

  private generateAccessToken(user: User): IToken {
    const accessTokenExpiredIn = this.configService.get(
      EnvKey.ACCESS_TOKEN_EXPIRED_IN,
    );
    const secretAccessTokenKey = this.configService.get(
      EnvKey.ACCESS_TOKEN_KEY,
    );
    const accessTokenOptions: JwtSignOptions = {
      secret: secretAccessTokenKey,
      expiresIn: accessTokenExpiredIn,
    };
    const payloadAccessToken = {
      ...user,
      expiresIn: accessTokenExpiredIn,
    };
    const accessToken = this.jwtService.sign(
      payloadAccessToken,
      accessTokenOptions,
    );

    return {
      token: accessToken,
      expiredIn: accessTokenExpiredIn,
    };
  }

  private generateRefreshToken(user: User, hashToken: string): IToken {
    const refreshTokenExpiredIn = this.configService.get(
      EnvKey.REFRESH_TOKEN_EXPIRED_IN,
    );
    const secretRefreshTokenKey = this.configService.get(
      EnvKey.REFRESH_TOKEN_KEY,
    );
    const refreshTokenOptions: JwtSignOptions = {
      secret: secretRefreshTokenKey,
      expiresIn: refreshTokenExpiredIn,
    };

    const payloadRefreshToken = {
      ...user,
      expiresIn: refreshTokenExpiredIn,
      hashToken,
    };
    const refreshToken = this.jwtService.sign(
      payloadRefreshToken,
      refreshTokenOptions,
    );
    return {
      token: refreshToken,
      expiredIn: refreshTokenExpiredIn,
    };
  }
}
