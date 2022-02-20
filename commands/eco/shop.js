const { SlashCommandBuilder } = require("@discordjs/builders");
const { Embed } = require("discord.js");
const items = require(`../../shop`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Check out the store! Usage: /shop"),
  async execute(interaction) {
    if (items.length == 0) {
      return interaction.reply("There are no items in the shop!");
    }

    const shopList = items.map((value, index) => {
      return `**${index + 1})** ${value.item} -> ${value.price}coins! | ${value.description}`;
    });
    const embed = new Embed()
      .setTitle("Shop")
      .setDescription(shopList.join("\n"))
      .setColor(0x00ff00)
      .setFooter({
        text: `REQUESTED BY ${interaction.member.user.tag} | Use /buy <number> to buy an item!`,
        iconURL: interaction.user.displayAvatarURL({ format: "png" }),
      });

    interaction.reply({ embeds: [embed] });
  },
};
