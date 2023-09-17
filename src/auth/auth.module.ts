import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DiscordStrategy } from './strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { SessionSerializer } from './utils/Serializer';

@Module({
  controllers: [AuthController],
  providers: [DiscordStrategy,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService
    },
    SessionSerializer,
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
  ]
})
export class AuthModule {}
