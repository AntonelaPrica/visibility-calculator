import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProjectFeatureSwaggerName } from './app/modules/projects/projects.config';
import { AuthFeatureSwaggerName } from './app/modules/auth/auth.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);
	const port = process.env.PORT || 3333;
	const config = new DocumentBuilder()
		.setTitle('Visibility Calculator API')
		.setDescription('An API for the calculation of field visibility of projects.')
		.setVersion('1.0')
		.addTag(AuthFeatureSwaggerName)
		.addTag(ProjectFeatureSwaggerName)
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(globalPrefix, app, document);

	await app.listen(port);
	Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
