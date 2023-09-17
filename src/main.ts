import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { getRepository } from 'typeorm';
import { TypeORMSession } from './typeorm/entities/Session';
import { TypeormStore } from 'connect-typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const sessionRepository = getRepository(TypeORMSession);
  
  const PORT = process.env.PORT || 3003;
  app.use(
    session({
      cookie: {
        maxAge: 86400000,
      },
      secret: 'mjugbtvdsefbuinjmii',
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(PORT, () => console.log(
    `Running on Port ${PORT}`
  ));
}
bootstrap();
