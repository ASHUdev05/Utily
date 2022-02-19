const { SlashCommandBuilder } = require('@discordjs/builders');
const help = require("../../models/ecodb")
const eco = help.eco

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weekly")
    .setDescription("Claim your weekly reward! Usage: /weekly"),
  async execute(interaction) {
    let add = await eco.weekly(interaction.user.id, false, 5000);
        if (add.cooldown) return interaction.reply(`You already claimed your weekly coins. Come back after ${add.time.days} days, ${add.time.hours} hours, ${add.time.minutes} minutes & ${add.time.seconds} seconds.`);
        return interaction.reply(`you claimed ${add.amount} as your weekly coins and now you have total ${add.money} 💸.`);
  },
};