require("dotenv").config();
const csv = require("csvtojson");
const Server = require("../src/database/mongodb/mongoose/server");
const PlayerRepository = require("../src/database/repository/player-info.repository");
const fs = require("fs");

// fs.readFile('members.csv')

Server.checkAndConnect().then(() => {
  //make sure this line is the last line

  // fs.readFile('./scripts/members.csv', 'utf8', function (err,data) {
  //     if (err) {
  //         return console.log(err);
  //     }
  //     console.log(data);
  // });

  csv({
    // noheader:true,
    output: "csv",
  })
    .fromFile("./scripts/members.csv")
    .then(async (csvRow) => {
      console.log(csvRow); // => [["1","2","3"], ["4","5","6"], ["7","8","9"]]
      const promiseResponse = csvRow.map(async (p) => {
        const player = {
          name: p[0],
          discord: {
            name: p[1],
            id: p[10],
          },
          guild: p[8],
          notes: p[9],
          active: p[2] === "TRUE",
        };
        if (player.name && player.discord.id) {
          const response = await PlayerRepository.insert(player);
          console.log(response);
          return response;
        }
        return {};
      });

      await Promise.all(promiseResponse);
      process.exit(0);
    });
});
