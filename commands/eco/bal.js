const { SlashCommandBuilder } = require('@discordjs/builders');
const help = require("../../models/ecodb")
const eco = help.eco

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bal")
    .setDescription("Know your balance! Usage: /bal"),
  async execute(interaction) {
    let money = await eco.fetchMoney(interaction.user.id);
    return interaction.reply(`${interaction.member} has ${money} coins.`);
  },
};