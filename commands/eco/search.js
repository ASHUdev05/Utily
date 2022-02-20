const { SlashCommandBuilder } = require('@discordjs/builders');
const help = require("../../models/ecodb")
const eco = help.eco

module.exports = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("Search for some money you digger! Usage: /search"),
  async execute(interaction) {
    let a=Math.floor(Math.random() * 100 + 250);
    let add1 = await eco.search(interaction.user.id, false, a);
    if (add1.cooldown) return interaction.reply(`You already have searched recently. Come back after ${add1.time.days} days, ${add1.time.hours} hours, ${add1.time.minutes} minutes & ${add1.time.seconds} seconds.`);
    return interaction.reply(`you got ${a} 💸 as your successful search reward.`);
  },
};