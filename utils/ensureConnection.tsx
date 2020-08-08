import {
  Connection,
  ConnectionOptions,
  getConnectionManager,
} from "typeorm/index";
import { DBTestEntity } from "../entities/DBTestEntity";

const options = {
  default: {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "wp-master",
    password: "secret",
    database: "morning_tasks",
    entities: [DBTestEntity],
    synchronize: true,
  } as ConnectionOptions,
};

function entitiesChanged(prevEntities: any[], newEntities: any[]): boolean {
  if (prevEntities.length !== newEntities.length) return true;

  for (let i = 0; i < prevEntities.length; i++) {
    if (prevEntities[i] !== newEntities[i]) return true;
  }

  return false;
}

async function updateConnectionEntities(
  connection: Connection,
  entities: any[]
) {
  if (!entitiesChanged(connection.options.entities, entities)) return;

  //@ts-ignore
  // noinspection JSConstantReassignment
    connection.options.entities = entities;

  // @ts-ignore
  connection.buildMetadatas();

  if (connection.options.synchronize) {
    await connection.synchronize();
  }
}

export async function ensureConnection(
  name: string = "default"
): Promise<Connection> {
  const connectionManager = getConnectionManager();

  if (connectionManager.has(name)) {
    const connection = connectionManager.get(name);

    if (!connection.isConnected) {
      await connection.connect();
    }

    if (process.env.NODE_ENV !== "production") {
      await updateConnectionEntities(connection, options[name].entities);
    }

    return connection;
  }

  return await connectionManager.create({ name, ...options[name] }).connect();
}
