const { SlashCommandBuilder } = require('@discordjs/builders');
const help = require("../../models/ecodb")
const eco = help.eco

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beg")
    .setDescription("Get some free money! Usage: /beg"),
  async execute(interaction) {
    let a=Math.floor(Math.random() * 150 + 50);
        let add1 = await eco.beg(interaction.user.id, false, a);
        if (add1.cooldown) return interaction.reply(`You already begged for coins recently. Come back after ${add1.time.days} days, ${add1.time.hours} hours, ${add1.time.minutes} minutes & ${add1.time.seconds} seconds.`);
        return interaction.reply(`you got ${a} 💸 as your successful beg.`);
  },
};