import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptor/transformer.interceptor';
import envValidator from './common/util/env-validator';
import { requiredEnvKeys } from './required-env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { AuthGuard } from './common/guard/auth.guard';
import { ResponseDTO } from './common/dto/response.dto';

/**
 * init the swagger docs for the application
 * @param app Nest Application Instance
 */
function initSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
        .setTitle(process.env.npm_package_name || 'API')
        .setDescription(process.env.npm_package_description)
        .setVersion(process.env.npm_package_version || '1.0')
        .build();

    const document = SwaggerModule.createDocument(app, options, {
        extraModels: [ResponseDTO],
    });

    SwaggerModule.setup('docs', app, document);
}

/**
 * Nest application startup
 */
async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalGuards(new AuthGuard(app.get(Reflector)));
    app.enableCors();
    app.enableShutdownHooks(); // Starts listening for shutdown hooks

    // swagger only available in non production
    if (process.env.NODE_ENV !== 'production') {
        initSwagger(app);
    }

    await app.listen(process.env.APP_PORT);
}

envValidator(requiredEnvKeys); // to ensure all the env required fill in. Error thrown if missing keys
bootstrap();
