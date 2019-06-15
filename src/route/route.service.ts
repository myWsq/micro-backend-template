import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { getMongoManager, MongoEntityManager } from "typeorm";
import { RouteComponent } from "../../model/route-component.entity";
import { RouteItem } from "../../model/route-item.entity";
import { CreateRouteItemDto } from "./create-route-item.dto";
import { CreateRouteComponentDto } from "./create-route-component.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class RouteService implements OnApplicationBootstrap {
  private manager: MongoEntityManager;
  onApplicationBootstrap() {
    this.manager = getMongoManager();
  }
  getRouteComponentByPath(path: string) {
    return this.manager.findOne(RouteComponent, {
      path,
    });
  }

  getRouteItemByPath(path: string) {
    return this.manager.findOne(RouteItem, {
      path,
    });
  }

  getRouteItems() {
    return this.manager.find(RouteItem);
  }

  getRouteComponents() {
    return this.manager.find(RouteComponent);
  }

  createRouteItem(
    createRouteItemDto: CreateRouteItemDto,
    routeComponent: RouteComponent
  ) {
    const routeItem = this.manager.create(RouteItem, {
      path: createRouteItemDto.path,
      component: routeComponent,
    });
    return this.manager.save(routeItem);
  }

  createRouteComponent(createRouteComponent: CreateRouteComponentDto) {
    const routeComponent = this.manager.create(
      RouteComponent,
      createRouteComponent
    );
    return this.manager.save(routeComponent);
  }
}
