import { Entity, ObjectID, ObjectIdColumn, Column, Index } from "typeorm";
@Entity()
export class RouteComponent {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  path: string;
  @Column()
  url: string;
}
