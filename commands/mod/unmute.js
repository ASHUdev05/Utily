const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require(`discord.log`);
const {api} = require(`../../config.json`);
const discord = new Discord(api);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unmute')
		.setDescription('Unmutes a user from the server Usage: /unmute <user>')
        .addMentionableOption(option => option.setRequired(true)
        .setName('user')
        .setDescription('The user to kick')),
	async execute(interaction) {
    try{
        if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply("You don't have permission to use this command!");
        const member = interaction.options.getMentionable('user');
        const muteRole = interaction.guild.roles.cache.find(role => role.name === "Muted by Utily");
        if(!muteRole) return interaction.reply("I can't find the mute role!");
        let muteRoleId = muteRole.id;
        if (!member) 
        return interaction.reply('Please mention a user or provide a valid user ID');
        if(!member.roles.cache.has(muteRoleId)) return interaction.reply("That user is not muted!");
        try {
            await member.roles.remove(muteRole)
            .then(() => {
            interaction.reply({content: `${member} has been unmuted`, ephemeral: true});
            });                
          } catch (err) {
            discord.log(err)
            return interaction.reply('Please check the role hierarchy', err.message);
          }
          try {
            member.guild.channels.cache
              .find((i) => i.name === "utily-logs")
              .send({ content: `${member} unmuted!` })
              .catch((err) => discord.log(err));
          } catch (err) {
            discord.log(err);
          }
        }catch(err){
        discord.log(err);
        //return interaction.reply("An error ocurred:"+err);
      }
    }
};