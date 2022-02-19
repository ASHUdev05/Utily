const { SlashCommandBuilder } = require('@discordjs/builders');
const help = require("../../models/ecodb")
const eco = help.eco

module.exports = {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Claim your daily reward! Usage: /daily"),
  async execute(interaction) {
    let add = await eco.daily(interaction.user.id, false, 500);
        if (add.cooldown) return interaction.reply(`You already claimed your daily coins. Come back after ${add.time.days} days, ${add.time.hours} hours, ${add.time.minutes} minutes & ${add.time.seconds} seconds.`);
        return interaction.reply(`you claimed ${add.amount} as your daily coins and now you have total ${add.money} 💸.`);
  },
};