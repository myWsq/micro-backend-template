import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import connect from "./model";
import { ValidationPipe } from "@nestjs/common";
import { ValidationException } from "./exception/validation.exception";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await connect();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: errors => {
        return new ValidationException(
          errors.map(item => ({
            field: item.property,
            code: "invalid",
            detail: item.constraints,
          }))
        );
      },
    })
  );
  await app.listen(3000);
}
bootstrap();
