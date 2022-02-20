const { SlashCommandBuilder } = require('@discordjs/builders');
const { Embed } = require("discord.js");
const items = require(`../../shop`);
const Keyv = require('keyv');
const keyv = new Keyv('sqlite://inventory.sqlite');
const help = require("../../models/ecodb")
const eco = help.eco

module.exports = {
  data: new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Buy something from the shop! Usage: /buy")
        .addIntegerOption(option => option.setName('item')
        .setDescription('Index of item in the shop')
        .setRequired(true)),
  async execute(interaction) {
    const item = interaction.options.getInteger('item');
    if (item < 0 || item > items.length) return interaction.reply('Please specify a valid item');
    const itemData = items[item];
    const itemName = itemData.item;
    const existingInventory = await keyv.get(interaction.member.id);
    const newList = existingInventory ? existingInventory + ',' + itemName : itemName;
    await keyv.set(interaction.member.id, newList);
    await eco.subtractMoney(interaction.member.id, false, itemData.price);

    const embed = new Embed()
        .setTitle(`Bought ${itemData.item}`)
        .setDescription(`${itemData.description}`)
        .addField({ name: 'Price', value: `${itemData.price}`})
        .setColor(0x00ff00)
        .setFooter({
            text: `REQUESTED BY ${interaction.member.user.tag} | Use /buy <number> to buy an item!`,
            iconURL: interaction.user.displayAvatarURL({ format: "png" }),
          });
    return interaction.reply({ embeds: [embed] });
  },
};