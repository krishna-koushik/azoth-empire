const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} = require("discord.js");
const { capitalize } = require("../../lib/utils");

class WarAttendance {
  constructor() {}

  handleInteraction(interaction) {
    const { customId, message } = interaction;
    // const {components: [{components: buttons}]} = message;
    //
    //   console.log(buttons)
    const warDetailEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(customId);

    const roster = {
      roster: [
        {
          WarType: "War",
          Date: "2021-08-29 22:00:00",
          Location: "Fort Everfall",
          CurrentPage: "1",
          TotalPages: "5",
          Army: [
            { Name: "KiN", Group: "1" },
            { Name: "Sol", Group: "1" },
            {
              Name: "Yoda",
              Group: "1",
            },
            { Name: "Fairuza", Group: "1" },
            { Name: "Blackmaze", Group: "1" },
            {
              Name: "DoubleWide",
              Group: "2",
            },
            { Name: "FuJiKaN", Group: "2" },
            { Name: "Luci", Group: "2" },
            {
              Name: "iShiny",
              Group: "2",
            },
            { Name: "Olesek", Group: "2" },
            { Name: "Saniphor", Group: "3" },
            {
              Name: "Phaba",
              Group: "3",
            },
            { Name: "Azrael's Tear", Group: "3" },
            { Name: "Ellie", Group: "3" },
            {
              Name: "Charon",
              Group: "3",
            },
            { Name: "GoodMoodDude", Group: "4" },
            { Name: "crizroblez", Group: "4" },
            {
              Name: "Wicked",
              Group: "4",
            },
            { Name: "SC Minion One", Group: "4" },
            { Name: "Leonard", Group: "4" },
            {
              Name: "MoonlessNyte",
              Group: "5",
            },
            { Name: "Voozoo", Group: "5" },
            { Name: "Bustados", Group: "5" },
            {
              Name: "Richter",
              Group: "5",
            },
            { Name: "aquaponiccowboy", Group: "5" },
            { Name: "Priestess", Group: "6" },
            {
              Name: "Ransom",
              Group: "6",
            },
            { Name: "Torbjor", Group: "6" },
            { Name: "LegoDerp", Group: "6" },
            {
              Name: "Z3ro",
              Group: "6",
            },
            { Name: "IncandescentAnor", Group: "7" },
            { Name: "Matticon", Group: "7" },
            {
              Name: "Serf",
              Group: "7",
            },
            { Name: "LordSobert", Group: "7" },
            { Name: "Vaishant", Group: "7" },
            {
              Name: "Kadarius Toney",
              Group: "8",
            },
            { Name: "SC Minion Two", Group: "8" },
            { Name: "Malachi McCloud", Group: "8" },
            {
              Name: "Stimbad",
              Group: "8",
            },
            { Name: "Dagaz", Group: "8" },
            { Name: "iPeace", Group: "9" },
            {
              Name: "Noodles",
              Group: "9",
            },
            { Name: "Chaos", Group: "9" },
            { Name: "Kallisti", Group: "9" },
            {
              Name: "Scythian",
              Group: "9",
            },
            { Name: "Grimlok DaiKaiju", Group: "10" },
            { Name: "watewut", Group: "10" },
            {
              Name: "PRY",
              Group: "10",
            },
            { Name: "Swift", Group: "10" },
            { Name: "Holy Smiter", Group: "10" },
          ],
          Standby: [
            { Name: "Coprophilia" },
            { Name: "Emasculate" },
            { Name: "Silvia" },
            { Name: "DEATH LORDS" },
            { Name: "spoon 0311" },
            { Name: "PokerPlate" },
            { Name: "hakka" },
            { Name: "QuadFather" },
            { Name: "Mezzarine" },
            { Name: "Odano" },
            { Name: "Orkosis" },
            { Name: "Saereth" },
            { Name: "William Blake" },
            { Name: "Shawshank" },
            { Name: "Kayley" },
            { Name: "Novahh" },
          ],
        },
      ],
    };

    warDetailEmbed.addField(
      `Group 1`,
      "Hasil, Windwalker, Wren, Venusin, IncandescentAnor"
    );
    warDetailEmbed.addField(`Group 2`, ".....");
    warDetailEmbed.addField(`Group 3`, ".....");
    warDetailEmbed.addField(`Group 4`, ".....");
    warDetailEmbed.addField(`Group 5`, ".....");
    warDetailEmbed.addField(`Group 6`, ".....");
    warDetailEmbed.addField(`Group 7`, ".....");
    warDetailEmbed.addField(`Group 8`, ".....");
    warDetailEmbed.addField(`Group 9`, ".....");
    warDetailEmbed.addField(`Group 10`, ".....");
    warDetailEmbed.addField(`Standby`, ".....");

    return { embeds: [warDetailEmbed] };
  }
}

module.exports = new WarAttendance();
