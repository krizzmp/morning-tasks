import { DBTestEntity } from "@/entities/DBTestEntity";
import { ConnectionOptions } from "typeorm/index";
import { User } from "@/entities/User";

export const connectionConfig = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "wp-master",
  password: "secret",
  database: "morning_tasks",
  entities: [DBTestEntity, User],
  synchronize: true,
} as ConnectionOptions;
