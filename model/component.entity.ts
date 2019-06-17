import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { RouteItem } from "./route-item.entity";
import { LayoutComponent } from "./layout-component.entity";
@Entity()
export class Component {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  path: string;
  @Column()
  js: string;
  @Column({
    nullable: true,
  })
  css: string;
  @OneToMany(type => RouteItem, routeItem => routeItem.component)
  routeItems: RouteItem[];
  @OneToMany(
    type => LayoutComponent,
    layoutComponent => layoutComponent.component
  )
  layoutComponents: LayoutComponent[];
}
