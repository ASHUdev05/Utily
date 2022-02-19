const Discord = require(`discord.log`);
const {api} = require(`../config.json`);
const discord = new Discord(api);

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName != "setup") {
    const muteRole = interaction.guild.roles.cache.find(role => role.name === "Muted by Utily");
    const logChannel = interaction.guild.channels.cache.find((i) => i.name === "utily-logs");
    if (!muteRole && !logChannel) return interaction.reply(`Please run the setup command first to use the bot! \`Tip: /setup\``);
    }
    
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      discord.log(error);
      return interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};