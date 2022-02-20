const { SlashCommandBuilder } = require('@discordjs/builders');
const { Embed } = require("discord.js");
const Keyv = require('keyv');
const keyv = new Keyv('sqlite://inventory.sqlite');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("Check your inventory! Usage: /inventory"),
  async execute(interaction) {
    const inventory = await keyv.get(interaction.member.id);
    //remove , from inventory
    let inv = inventory.replace(/,/g, ' ');
    //count number of same words in inventory and remove duplicates and add count to a separate array
    let count = inv.split(' ').reduce(function(acc, curr) {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
    //create an array of objects with the item name and count
    let items = Object.keys(count).map(function(key) {
        return {
            item: key,
            count: count[key]
        };
    });
    //sort the array by count
    items.sort(function(a, b) {
        return b.count - a.count;
    });
    if (inventory === null) {
      const embed = new Embed()
        .setTitle('Inventory')
        .setDescription('You have no items in your inventory!')
        .setColor(0x00ff00)
        .setFooter({
          text: `REQUESTED BY ${interaction.member.user.tag} | Use /buy <number> to buy an item!`,
          iconURL: interaction.user.displayAvatarURL({ format: "png" }),
        });
      return interaction.reply({ embeds: [embed] });
    } else {
      const embed = new Embed()
        .setTitle('Inventory')
        .setDescription(`You have ${items.length} items in your inventory! \n\n Items: ${items.map(item => `${item.item} x${item.count}`).join(', ')}`)
        .setColor(0x00ff00)
        .setFooter({
          text: `REQUESTED BY ${interaction.member.user.tag} | Use /buy <number> to buy an item!`,
          iconURL: interaction.user.displayAvatarURL({ format: "png" }),
        });
      return interaction.reply({ embeds: [embed] });
    }
  },
};
function countOccurences(string, word) {
    return string.split(word).length - 1;
 }
 var text="We went down to the stall, then down to the river."; 
 var count=countOccurences(text,"down"); // 2