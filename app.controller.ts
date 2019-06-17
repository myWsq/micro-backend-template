import { Controller, Get, NotFoundException } from "@nestjs/common";
import { RouteService } from "./src/route/route.service";
import { LayoutService } from "./src/layout/layout.service";

@Controller()
export class AppController {
  constructor(
    private readonly routeService: RouteService,
    private readonly layoutService: LayoutService
  ) {}
  @Get("/config")
  async getConfig() {
    const routeItems = await this.routeService.getRouteItems();
    const layoutComponent = await this.layoutService.getLayoutComponent();
    if (!layoutComponent) {
      throw new NotFoundException("Layout component not found");
    }
    return {
      routeItems,
      layoutComponent,
    };
  }
}
