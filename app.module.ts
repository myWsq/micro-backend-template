import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { RouteModule } from "./src/route/route.module";

@Module({
  controllers: [AppController],
  imports: [RouteModule],
})
export class AppModule {}
