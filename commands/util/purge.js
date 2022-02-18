const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require(`discord.log`);
const {api} = require(`../../config.json`);
const discord = new Discord(api);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Deletes multiple messages at once! Usage: /clear <number>")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of messages to delete.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const amt = interaction.options.getInteger("amount");
    if (amt > 100)
      return interaction.reply("You can only delete 100 messages at once!");
    if (amt < 1)
      return interaction.reply("You must delete at least one message!");

    try {
      const messages = await interaction.channel.messages.fetch({ limit: amt });
      await interaction.channel.bulkDelete(messages);
      return interaction.reply(`Deleted ${amt} messages!`);
    } catch (error) {
      discord.error(error);
      return interaction.reply("There was an error while deleting messages!");
    }
  },
};