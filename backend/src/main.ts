import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function start() {
  const PORT = process.env.PORT || 5050;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const config = new DocumentBuilder()
    .setTitle('art backend')
    .setDescription('Documentation api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.enableCors();

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(PORT, () => console.log(`server work on port = ${PORT}`));
}

start();
