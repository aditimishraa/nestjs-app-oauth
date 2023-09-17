import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { entities } from './typeorm';

@Module({
  imports: [AuthModule,
  ConfigModule.forRoot({envFilePath: '.env.development'}),
  TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: Number.parseInt(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASS,
      database: process.env.MYSQL_DB_NAME,
      entities: entities,
      synchronize: true,
      autoLoadEntities: true
    }),
    PassportModule.register({ session: true }),
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
