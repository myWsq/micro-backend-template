import { createConnection } from "typeorm";
//@ts-ignore
import entities from "./*.entity.ts";
import _ from "lodash";

export default () => {
  return createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "micro-fe",
    synchronize: true,
    entities: _.values(entities).map(item => item[Object.keys(item)[0]]),
  });
};
