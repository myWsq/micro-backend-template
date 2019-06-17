import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Component } from "./component.entity";

@Entity()
export class LayoutComponent {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(type => Component, component => component.layoutComponents)
  component: Component;
}
