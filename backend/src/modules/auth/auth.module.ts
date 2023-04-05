import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseService } from 'src/common/services/database.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './passport/local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'dasdas',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, DatabaseService, LocalStrategy],
})
export class AuthModule {}
