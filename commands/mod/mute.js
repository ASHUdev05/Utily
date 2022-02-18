const { SlashCommandBuilder } = require('@discordjs/builders');
const ms = require('ms');
const Discord = require(`discord.log`);
const {api} = require(`../../config.json`);
const discord = new Discord(api);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('Mutes a user from the server for a specified amount of time Usage: /mute <user> <time> <reason>')
        .addMentionableOption(option => option.setRequired(true)
        .setName('user')
        .setDescription('The user to kick'))
        .addStringOption(option => option.setRequired(true)
        .setName('time')
        .setDescription('Time for which the mute lasts enter a length of time of 14 days or less (1s/m/h/d):'))
        .addStringOption(option => option.setName('reason')
        .setDescription('The reason for kicking the user')),
	async execute(interaction) {
    try{
        if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply("You don't have permission to use this command!");
        const member = interaction.options.getMentionable('user');
        let reason = interaction.options.getString('reason');
        const time1 = interaction.options.getString('time');
        const muteRole = interaction.guild.roles.cache.find(role => role.name === "Muted by Utily");
        if(!muteRole) return interaction.reply("There is no mute role use `/setup` to create one");
        let muteRoleId = muteRole.id;
        if (!member) 
        return interaction.reply('Please mention a user or provide a valid user ID');
        if (member === interaction.member)
        return interaction.reply('You cannot mute yourself');
        if (member.roles.highest.position >= interaction.member.roles.highest.position)
        return interaction.reply('You cannot mute someone with an equal or higher role');
        let time = ms(time1);
        if (!time || time > 1209600000) // Cap at 14 days, larger than 24.8 days causes integer overflow
        return interaction.reply('Please enter a length of time of 14 days or less (1s/m/h/d)');

        if (!reason) reason = '`None Provided`';
        if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

        if (member.roles.cache.has(muteRoleId))
        return interaction.reply('Provided member is already muted');

        // Mute member
        try {
        await member.roles.add(muteRole)
        .then(() => {
            interaction.reply({content: `${member.user.tag} has been muted for ${time1}`, ephemeral: true});
        });
        } catch (err) {
        discord.log(err)
        return interaction.reply('Please check the role hierarchy', err.message);
        }
        
        try{
            member.guild.channels.cache
          .find((i) => i.name === "utily-logs")
          .send(
            `${member} muted for **${time1}** by ${interaction.member.displayName}! | Reason: ${reason}`
          ).catch(err => discord.log(err));
        }catch(err){
            discord.log(err);
        }

        // Unmute member
        setTimeout(async () => {
        try {
            await member.roles.remove(muteRole);
            interaction.channel.send(`${member} has been unmuted.`);
            member.guild.channels.cache.find(i => i.name === 'utily-logs').send(`${member} unmuted!`);
        } catch (err) {
            discord.log(err)
            //return interaction.reply('Please check the role hierarchy', err.message);
        }
        }, time);
        }catch(err){
        discord.log(err);
        //interaction.reply("An error ocurred:"+err);
      }
    }
};