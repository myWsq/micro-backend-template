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
      path,
    });
  }
  getComponents() {
    return this.manager.find(Component);
  }
}
