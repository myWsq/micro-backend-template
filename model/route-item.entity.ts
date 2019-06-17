import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Component } from "./component.entity";

@Entity()
export class RouteItem {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  path: string;
  @ManyToOne(type => Component, Component=>Component.routeItems)
  component: Component;
}
