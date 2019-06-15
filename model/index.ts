import { createConnection } from "typeorm";
//@ts-ignore
import entities from "./*.entity.ts";
import _ from "lodash";

export default () => {
  return createConnection({
    type: "mongodb",
    host: "sxyori.com",
    port: 27017,
    username: "myWsq",
    password: "Wshuaiqi123",
    database: "micro-fe",
    useNewUrlParser: true,
    synchronize: true,
    entities: _.values(entities).map(item => item[Object.keys(item)[0]]),
  });
};
