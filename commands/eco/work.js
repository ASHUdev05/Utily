const { SlashCommandBuilder } = require('@discordjs/builders');
const help = require("../../models/ecodb")
const eco = help.eco

module.exports = {
  data: new SlashCommandBuilder()
    .setName("work")
    .setDescription("Earn some well deserved cash! Usage: /work"),
  async execute(interaction) {
    let a=Math.floor(Math.random() * 150 + 100);
    let add2 = await eco.work(interaction.user.id, false, a);
    if (add2.cooldown) return interaction.reply(`You already have worked recently. Come back after ${add2.time.days} days, ${add2.time.hours} hours, ${add2.time.minutes} minutes & ${add2.time.seconds} seconds.`);
    return interaction.reply(`you got ${a} 💸 for your successful work.`);
  },
};