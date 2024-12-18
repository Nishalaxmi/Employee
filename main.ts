import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Employee Details  ')
    .setDescription('')
    .setVersion('1.0')
    .addTag('employees')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('employee-detail', app, document);
  app.enableCors({
    origin: 'http://localhost:4200', // Specify your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
