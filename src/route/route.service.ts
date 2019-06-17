import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { getManager, EntityManager } from "typeorm";
import { Component } from "../../model/component.entity";
import { RouteItem } from "../../model/route-item.entity";
import { CreateRouteItemDto } from "./create-route-item.dto";

@Injectable()
export class RouteService implements OnApplicationBootstrap {
  private manager: EntityManager;
  onApplicationBootstrap() {
    this.manager = getManager();
  }

  getRouteItemByPath(path: string) {
    return this.manager.findOne(RouteItem, {
      path,
    });
  }

  getRouteItems() {
    return this.manager.find(RouteItem, {
      relations: ["component"],
    });
  }

  createRouteItem(
    createRouteItemDto: CreateRouteItemDto,
    component: Component
  ) {
    const routeItem = this.manager.create(RouteItem, {
      path: createRouteItemDto.path,
      component: component,
    });
    return this.manager.save(routeItem);
  }
}
