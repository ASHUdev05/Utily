const { SlashCommandBuilder } = require('@discordjs/builders');
const help = require("../../models/ecodb")
const eco = help.eco

module.exports = {
  data: new SlashCommandBuilder()
    .setName("monthly")
    .setDescription("Claim your monthly rewrd! Usage: /monthly"),
  async execute(interaction) {
        let add = await eco.monthly(interaction.user.id, false, 50000);
        if (add.cooldown) return interaction.reply(`You already claimed your monthly coins. Come back after ${add.time.days} days, ${add.time.hours} hours, ${add.time.minutes} minutes & ${add.time.seconds} seconds.`);
        return interaction.reply(`you claimed ${add.amount} as your monthly coins and now you have total ${add.money} 💸.`);
  },
};