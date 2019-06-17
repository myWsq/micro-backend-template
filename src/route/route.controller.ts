import { Controller, Post, Body } from "@nestjs/common";
import {
  ValidationException,
  ValidationExceptionPayload,
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
    const Component = await this.componentService.getComponentByPath(
      createRouteItemDto.componentPath
    );
    const routeItemShadow = await this.routeService.getRouteItemByPath(
      createRouteItemDto.path
    );

    // 添加异常信息
    if (!Component) {
      exceptionPayload.push({
        field: "componentPath",
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

    return this.routeService.createRouteItem(createRouteItemDto, Component);
  }
}
