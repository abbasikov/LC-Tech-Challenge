import config from "config";
import Sequelize from "sequelize";
import { dbConfig } from "@interfaces/db.interface";
import ClientModel from "@/models/clients.model";
import { logger } from "@utils/logger";
import EventModel from "@/models/events.model";
import LocationModel from "@/models/location.model";
import AssetModel from "@/models/assets.model";
import AnswerKeyModel from "@/models/answer_key.model";

const { host, user, password, database, pool }: dbConfig =
  config.get("dbConfig");
const sequelize = new Sequelize.Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
  pool: {
    min: pool.min,
    max: pool.max,
  },
  logQueryParameters: process.env.NODE_ENV === "development",
  logging: (query, time) => {
    logger.info(time + "ms" + " " + query);
  },
  benchmark: true,
});

sequelize.authenticate();

const DB = {
  Clients: ClientModel(sequelize),
  Locations: LocationModel(sequelize),
  Events: EventModel(sequelize),
  Assets: AssetModel(sequelize),
  AnswerKeys: AnswerKeyModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
