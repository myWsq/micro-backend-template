import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { RouteModule } from "./src/route/route.module";
import { ComponentModule } from './src/component/component.module';
import { LayoutModule } from './src/layout/layout.module';

@Module({
  controllers: [AppController],
  imports: [RouteModule, ComponentModule, LayoutModule],
})
export class AppModule {}
