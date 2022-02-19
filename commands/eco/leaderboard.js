const { SlashCommandBuilder } = require('@discordjs/builders');
const { Embed } = require(`discord.js`);
const help = require("../../models/ecodb")
const eco = help.eco

module.exports = {
  data: new SlashCommandBuilder()
    .setName("eco-leaderboard")
    .setDescription("Know the list of rich peoples here! Usage: /eco-leaderboard"),
  async execute(interaction) {
    let lb = await eco.leaderboard(false, 10);
        const embed = new Embed()
        .setAuthor({ name: "Leaderboard"})
        .setColor(0x0099ff);
        lb.forEach(u => {
            embed.addField({ name: `${u.position}. ${interaction.client.users.cache.get(u.user).tag}`, value: `Money: ${u.money} 💸`});
        });
        embed.setFooter({ text: `Requested by ${interaction.user.tag} | If embed is empty, there is no leaderboard.`});
        return interaction.reply({ embeds: [embed]});
  },
};