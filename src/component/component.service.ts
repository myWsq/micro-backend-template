import { Injectable } from "@nestjs/common";
import { CreateComponentDto } from "./create-component.dto";
import { EntityManager, getManager } from "typeorm";
import { Component } from "../../model/component.entity";

@Injectable()
export class ComponentService {
  private manager: EntityManager;
  onApplicationBootstrap() {
    this.manager = getManager();
  }
  createComponent(createComponentDto: CreateComponentDto) {
    const component = this.manager.create(Component, createComponentDto);
    return this.manager.save(component);
  }
  getComponentByPath(path: string) {
    return this.manager.findOne(Component, {
      path
    });
  }
  getOneComponent(id: number) {
    return this.manager.findOne(Component, id);
  }
  getComponents() {
    return this.manager.find(Component);
  }
  updateComponent(id: number, payload: CreateComponentDto) {
    return this.manager.update(Component, id, payload);
  }
  deleteComponent(id: number) {
    return this.manager.delete(Component, id);
  }
  async getComponentUsedCount(id: number) {
    const component = await this.manager.findOne(Component, id, {
      relations: ["routeItems", "layoutComponents"]
    });
    return component.routeItems.length + component.layoutComponents.length;
  }
}
