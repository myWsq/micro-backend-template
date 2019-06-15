import { Controller, Get } from "@nestjs/common";
import { RouteService } from "./src/route/route.service";

@Controller()
export class AppController {
  constructor(private readonly routeService: RouteService) {}
  @Get("/config")
  async getConfig() {
    const routeItems = await this.routeService.getRouteItems();
    return {
      routeItems,
    };
  }
}
