import { Module } from "@nestjs/common";
import { RouteController } from "./route.controller";
import { RouteService } from "./route.service";
import { ComponentModule } from "../component/component.module";

@Module({
  imports: [ComponentModule],
  controllers: [RouteController],
  providers: [RouteService],
  exports: [RouteService],
})
export class RouteModule {}
