import { Controller, Post, Body, Put, Param } from "@nestjs/common";
import {
  ValidationException,
  ValidationExceptionPayload
} from "../../exception/validation.exception";
import { CreateRouteItemDto } from "./create-route-item.dto";
import { RouteService } from "./route.service";
import { ComponentService } from "../component/component.service";

@Controller("route")
export class RouteController {
  constructor(
    private readonly routeService: RouteService,
    private readonly componentService: ComponentService
  ) {}
  @Post()
  async createRouteItem(@Body() createRouteItemDto: CreateRouteItemDto) {
    const exceptionPayload: ValidationExceptionPayload[] = [];

    // 获取验证信息
    const component = await this.componentService.getOneComponent(
      createRouteItemDto.componentId
    );
    const routeItemShadow = await this.routeService.getRouteItemByPath(
      createRouteItemDto.path
    );

    // 添加异常信息
    if (!component) {
      exceptionPayload.push({
        field: "componentId",
        code: "missing"
      });
    }

    if (routeItemShadow) {
      exceptionPayload.push({
        field: "path",
        code: "alreadyExists"
      });
    }

    if (exceptionPayload.length) {
      throw new ValidationException(exceptionPayload);
    }
    return this.routeService.createRouteItem(createRouteItemDto, component);
  }

  @Put(":id")
  async updateRouteItem(
    @Param("id") id: number,
    @Body() createRouteItemDto: CreateRouteItemDto
  ) {
    const exceptionPayload: ValidationExceptionPayload[] = [];

    // 判断路由是否存在
    const currentRouteItem = await this.routeService.getOneRouteItem(id);
    if (!currentRouteItem) {
      exceptionPayload.push({
        field: "id",
        code: "missing"
      });
      throw new ValidationException(exceptionPayload);
    }

    // 获取验证信息
    const component = await this.componentService.getOneComponent(
      createRouteItemDto.componentId
    );
    const routeItemShadow = await this.routeService.getRouteItemByPath(
      createRouteItemDto.path
    );
    // 添加异常信息
    if (!component) {
      exceptionPayload.push({
        field: "componentId",
        code: "missing"
      });
    }

    if (routeItemShadow && routeItemShadow.id !== id) {
      exceptionPayload.push({
        field: "path",
        code: "alreadyExists"
      });
    }
    if (exceptionPayload.length) {
      throw new ValidationException(exceptionPayload);
    }
    return this.routeService.updateRouteItem(id, createRouteItemDto, component);
  }
}
