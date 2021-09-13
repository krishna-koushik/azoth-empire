const { FieldType } = require("influx");

class PlayerSchema {
  constructor() {
    this.measurement = "player";
    this.fields = {
      discordName: FieldType.STRING,
      gameData: {
        level: FieldType.INTEGER,
        weapon: [FieldType.STRING],
        teams: [FieldType.STRING],
        averageGs: FieldType.INTEGER,
        amulet: FieldType.INTEGER,
        ring: FieldType.INTEGER,
        earring: FieldType.INTEGER,
        bag1: FieldType.INTEGER,
        bag2: FieldType.INTEGER,
        bag3: FieldType.INTEGER,
        helm: FieldType.INTEGER,
        chest: FieldType.INTEGER,
        hands: FieldType.INTEGER,
        pants: FieldType.INTEGER,
        boots: FieldType.INTEGER,
        shield: FieldType.INTEGER,
        attribute: {
          primary: FieldType.STRING,
          secondary: FieldType.STRING,
          preferredWeightClass: FieldType.STRING,
        },
        skills: {
          trade: {
            jewel: FieldType.INTEGER,
            engineering: FieldType.INTEGER,
            food: FieldType.INTEGER,
            armoring: FieldType.INTEGER,
            weaponsmithing: FieldType.INTEGER,
            arcana: FieldType.INTEGER,
            furnishing: FieldType.INTEGER,
            stone: FieldType.INTEGER,
          },
          gathering: {
            smelting: FieldType.INTEGER,
            woodworking: FieldType.INTEGER,
            weaving: FieldType.INTEGER,
            leatherworking: FieldType.INTEGER,
            logging: FieldType.INTEGER,
            mining: FieldType.INTEGER,
            harvesting: FieldType.INTEGER,
            skinning: FieldType.INTEGER,
            fishing: FieldType.INTEGER,
          },
        },
      },
    };

    this.tags = ["name", "guild", "discordId", "active"];
  }
}

module.exports = new PlayerSchema();
