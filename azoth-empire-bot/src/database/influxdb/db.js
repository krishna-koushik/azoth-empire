const { InfluxDB } = require("influx");
const { schemas } = require("./schema");
const { DB_NAME, DB_HOST } = process.env;

class Database {
  constructor() {
    this.db = new InfluxDB({
      host: DB_HOST,
      database: DB_NAME,
      schema: schemas,
    });
  }

  async start() {
    const names = await this.db.getDatabaseNames();
    if (!names.includes(DB_HOST)) {
      await this.db.createDatabase(DB_HOST);
    }
  }
}

module.exports = new Database();
