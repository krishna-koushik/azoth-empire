const { FieldType } = require("influx");

class WarReportSchema {
  constructor() {
    this.measurement = "war-report";
    this.fields = {
      startTime: Date,
      roster: {
        group1: [FieldType.STRING],
        group2: [FieldType.STRING],
        group3: [FieldType.STRING],
        group4: [FieldType.STRING],
        group5: [FieldType.STRING],
        group6: [FieldType.STRING],
        group7: [FieldType.STRING],
        group8: [FieldType.STRING],
        group9: [FieldType.STRING],
        group10: [FieldType.STRING],
        standby: [FieldType.STRING],
      },
      performance: [
        {
          rank: FieldType.INTEGER,
          name: FieldType.STRING,
          score: FieldType.INTEGER,
          kills: FieldType.INTEGER,
          deaths: FieldType.INTEGER,
          assits: FieldType.INTEGER,
          healing: FieldType.INTEGER,
          damage: FieldType.INTEGER,
        },
      ],
    };

    this.tags = ["name", "location", "type"];
  }
}

module.exports = new WarReportSchema();
