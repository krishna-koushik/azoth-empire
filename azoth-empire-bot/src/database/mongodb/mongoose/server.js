const Mongoose = require("mongoose");
const fs = require("fs");

const MONGO_URI = fs
  .readFileSync("secrets/.mongo-uri", "utf8")
  .toString()
  .trim();

const {} = require("./models");
class Database {
  constructor() {
    this.db = null;
  }

  setupDatabaseConnection() {
    return new Promise((resolve, reject) => {
      let connection = Mongoose.connect(
        MONGO_URI,
        {
          autoIndex: true,
          keepAlive: true,
          keepAliveInitialDelay: 300000,
          retryWrites: true,
        },
        (error) => {
          if (error) {
            console.error(error);
            reject(error);
          }

          resolve(connection);
        }
      );

      this.db = Mongoose.connection;

      //if we lose mongo on error or we are disconnected just kill the process.
      this.db.on("error", (error) => {
        console.error(error);
        reject(error);
      });

      this.db.on("disconnected", (error) => {
        console.warn("MongoDB disconnected!", { error });
      });

      this.db.on("disconnecting", (error) => {
        console.warn("MongoDB disconnecting!", { error });
      });

      this.db.on("reconnected", (error) => {
        console.warn("MongoDB reconnected!", { error });
      });

      this.db.on("reconnectFailed", (error) => {
        console.warn("MongoDB reconnectFailed!", { error });
      });

      this.db.on("close", (error) => {
        console.warn("MongoDB connection closed!", { error });
      });

      this.db.on("connecting", (error) => {
        console.warn("MongoDB connecting!", { error });
      });

      this.db.on("connected", (data) => {
        console.warn("MongoDB connected!", { data });
      });

      this.db.on("all", (error) => {
        console.warn("MongoDB connected to all replica sets!", {
          error,
        });
      });

      process
        .on("SIGINT", () => {
          console.warn("Process exiting on SIGINT");
          this.gracefulExit();
        })
        .on("SIGTERM", () => {
          console.warn("Process exiting on SIGTERM");
          this.gracefulExit();
        });
    });
  }

  async checkAndConnect() {
    if (Mongoose.connection.readyState !== 1) {
      return await this.setupDatabaseConnection();
    } else {
      return this.db;
    }
  }

  gracefulExit() {
    Mongoose.connection.close(() => {
      process.exit(0);
    });
  }
}

module.exports = new Database();
