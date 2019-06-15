import { Entity, ObjectID, ObjectIdColumn, Column, Index } from "typeorm";
import { RouteComponent } from "./route-component.entity";

@Entity()
export class RouteItem {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  path: string;
  @Column(type => RouteComponent)
  component: RouteComponent;
}
