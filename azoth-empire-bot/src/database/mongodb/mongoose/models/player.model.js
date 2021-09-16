const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

let playerSchema = new Schema({
  name: {
    type: String,
    index: true,
  },
  discord: new Schema({
    name: String,
    id: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
    },
  }),
  guild: {
    type: String,
    index: true,
  },
  appData: new Schema({
    login: {
      type: Boolean,
      default: false,
    },
  }),
  gameData: new Schema({
    level: {
      type: Number,
      default: 0,
    },
    weapon: [String],
    teams: [String],
    averageGs: {
      type: Number,
      default: 0,
    },
    amulet: {
      type: Number,
      default: 0,
    },
    ring: {
      type: Number,
      default: 0,
    },
    earring: {
      type: Number,
      default: 0,
    },
    bag1: {
      type: Number,
      default: 0,
    },
    bag2: {
      type: Number,
      default: 0,
    },
    bag3: {
      type: Number,
      default: 0,
    },
    helm: {
      type: Number,
      default: 0,
    },
    chest: {
      type: Number,
      default: 0,
    },
    hands: {
      type: Number,
      default: 0,
    },
    pants: {
      type: Number,
      default: 0,
    },
    boots: {
      type: Number,
      default: 0,
    },
    shield: {
      type: Number,
      default: 0,
    },
    attribute: new Schema({
      primary: String,
      secondary: String,
      preferredWeightClass: String,
    }),
    skills: new Schema({
      trade: new Schema({
        jewel: {
          type: Number,
          default: 0,
        },
        engineering: {
          type: Number,
          default: 0,
        },
        food: {
          type: Number,
          default: 0,
        },
        armoring: {
          type: Number,
          default: 0,
        },
        weaponsmithing: {
          type: Number,
          default: 0,
        },
        arcana: {
          type: Number,
          default: 0,
        },
        furnishing: {
          type: Number,
          default: 0,
        },
        stone: {
          type: Number,
          default: 0,
        },
      }),
      gathering: new Schema({
        smelting: {
          type: Number,
          default: 0,
        },
        woodworking: {
          type: Number,
          default: 0,
        },
        weaving: {
          type: Number,
          default: 0,
        },
        leatherworking: {
          type: Number,
          default: 0,
        },
        logging: {
          type: Number,
          default: 0,
        },
        mining: {
          type: Number,
          default: 0,
        },
        harvesting: {
          type: Number,
          default: 0,
        },
        skinning: {
          type: Number,
          default: 0,
        },
        fishing: {
          type: Number,
          default: 0,
        },
      }),
      weapons: new Schema({
        swordAndShield: {
          type: Number,
          default: 1,
        },
        rapier: {
          type: Number,
          default: 1,
        },
        hatchet: {
          type: Number,
          default: 1,
        },
        spear: {
          type: Number,
          default: 1,
        },
        greatAxe: {
          type: Number,
          default: 1,
        },
        warHammer: {
          type: Number,
          default: 1,
        },
        bow: {
          type: Number,
          default: 1,
        },
        musket: {
          type: Number,
          default: 1,
        },
        lifeStaff: {
          type: Number,
          default: 1,
        },
        fireStaff: {
          type: Number,
          default: 1,
        },
        iceGauntlet: {
          type: Number,
          default: 1,
        },
      }),
    }),
  }),
  joinDate: {
    type: Date,
    default: Date.now(),
    index: true,
  },
  notes: String,
  active: {
    type: Boolean,
    default: false,
    index: true,
  },
});

module.exports = Mongoose.model("players", playerSchema);
