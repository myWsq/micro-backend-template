import { Injectable } from "@nestjs/common";
import { EntityManager, getManager } from "typeorm";
import { LayoutComponent } from "../../model/layout-component.entity";
import { Component } from "../../model/component.entity";

@Injectable()
export class LayoutService {
  private manager: EntityManager;
  onApplicationBootstrap() {
    this.manager = getManager();
  }
  async setLayoutComponent(component: Component) {
    await this.manager.clear(LayoutComponent);
    const layoutComponent = this.manager.create(LayoutComponent, {
      component: component,
    });
    return this.manager.save(layoutComponent);
  }
  async getLayoutComponent() {
    const layouts = await this.manager.find(LayoutComponent, {
      take: 1,
      relations: ["component"],
    });
    return layouts[0] && layouts[0].component;
  }
}
