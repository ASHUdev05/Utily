const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require(`discord.log`);
const {api} = require(`../../config.json`);
const discord = new Discord(api);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('permmute')
		.setDescription('Mutes a user from the server for infinite time Usage: /permmute <user> <reason>')
        .addMentionableOption(option => option.setRequired(true)
        .setName('user')
        .setDescription('The user to kick'))
        .addStringOption(option => option.setName('reason')
        .setDescription('The reason for kicking the user')),
	async execute(interaction) {
    try{
        if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply("You don't have permission to use this command!");
        const member = interaction.options.getMentionable('user');
        const muteRole = interaction.guild.roles.cache.find(role => role.name === "Muted by Utily");
        if(!muteRole) return interaction.reply("I can't find the mute role! run /setup to fix this");
        let muteRoleId = muteRole.id;
        let reason = interaction.options.getString('reason');
        if (!member) 
        return interaction.reply('Please mention a user or provide a valid user ID');
        
        if (!reason) reason = '`None Provided`';
        if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

        if (member.roles.cache.has(muteRoleId))
        return interaction.reply('Provided member is already muted');

        // Mute member
        try {
        await member.roles.add(muteRole)
        .then(() => {
            return interaction.reply({content: `${member.user.tag} has been muted`, ephemeral: true});
        });
        } catch (err) {
        discord.log(err)
        return interaction.reply('Please check the role hierarchy', err.message);
        }
        
        member.guild.channels.cache.find(i => i.name === 'utily-logs').send(`${member} muted for **indefinite time** by ${interaction.member.displayName}! | Reason: ${reason}`);
        }catch(err){
        discord.log(err);
        //interaction.reply("An error ocurred:"+err);
      }

    }
};