const { gql } = require("apollo-server");

module.exports = gql`
  type Discord {
    name: String
    id: String
  }

  type AppData {
    login: Boolean
  }

  type GameAttributes {
    primary: String
    secondary: String
    preferredWeightClass: String
  }

  type TradeSkill {
    jewel: Int
    engineering: Int
    food: Int
    armoring: Int
    weaponsmithing: Int
    arcana: Int
    furnishing: Int
    stone: Int
  }

  type GatheringSkill {
    smelting: Int
    woodworking: Int
    weaving: Int
    leatherworking: Int
    logging: Int
    mining: Int
    harvesting: Int
    skinning: Int
    fishing: Int
  }
  type WeaponSkill {
    swordAndShield: Int
    rapier: Int
    hatchet: Int
    spear: Int
    greatAxe: Int
    warHammer: Int
    bow: Int
    musket: Int
    lifeStaff: Int
    fireStaff: Int
    iceGauntlet: Int
  }

  type GameSkill {
    trade: TradeSkill
    gathering: GatheringSkill
    weapons: WeaponSkill
  }

  type GameData {
    level: Int
    weapon: [String]
    teams: [String]
    averageGs: Int
    amulet: Int
    ring: Int
    earring: Int
    bag1: Int
    bag2: Int
    bag3: Int
    helm: Int
    chest: Int
    hands: Int
    pants: Int
    boots: Int
    shield: Int
    attribute: GameAttributes
    skills: GameSkill
  }

  type Player {
    _id: ID!
    name: String
    discord: Discord
    guild: String
    appData: AppData
    gameData: GameData
    joinDate: Date
    notes: String
    active: Boolean
  }
`;
