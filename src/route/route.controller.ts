import { Controller, Post, Body, Get } from "@nestjs/common";
import { CreateRouteComponentDto } from "./create-route-component.dto";
import { getMongoManager } from "typeorm";
import {
  ValidationException,
  ValidationExceptionPayload,
} from "../../exception/validation.exception";
import { CreateRouteItemDto } from "./create-route-item.dto";
import { RouteService } from "./route.service";

@Controller("route")
export class RouteController {
  constructor(private readonly routeService: RouteService) {}
  @Post()
  async createRouteItem(@Body() createRouteItemDto: CreateRouteItemDto) {
    const exceptionPayload: ValidationExceptionPayload[] = [];

    // 获取验证信息
    const routeComponent = await this.routeService.getRouteComponentByPath(
      createRouteItemDto.component.path
    );
    const routeItemShadow = await this.routeService.getRouteItemByPath(
      createRouteItemDto.path
    );

    // 添加异常信息
    if (!routeComponent) {
      exceptionPayload.push({
        field: "component",
        code: "missing",
      });
    }

    if (routeItemShadow) {
      exceptionPayload.push({
        field: "path",
        code: "alreadyExists",
      });
    }

    if (exceptionPayload.length) {
      throw new ValidationException(exceptionPayload);
    }

    return this.routeService.createRouteItem(
      createRouteItemDto,
      routeComponent
    );
  }

  @Post("component")
  async createRouteComponent(
    @Body() createRouteComponentDto: CreateRouteComponentDto
  ) {
    if (
      await this.routeService.getRouteComponentByPath(
        createRouteComponentDto.path
      )
    ) {
      throw new ValidationException([
        {
          field: "path",
          code: "alreadyExists",
        },
      ]);
    }
    return this.routeService.createRouteComponent(createRouteComponentDto);
  }
}
