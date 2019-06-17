import { Module } from "@nestjs/common";
import { LayoutController } from "./layout.controller";
import { LayoutService } from "./layout.service";
import { ComponentModule } from "../component/component.module";

@Module({
  imports: [ComponentModule],
  controllers: [LayoutController],
  providers: [LayoutService],
  exports: [LayoutService],
})
export class LayoutModule {}
