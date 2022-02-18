const { SlashCommandBuilder } = require('@discordjs/builders');
const { User } = require('discord.js');
const Discord = require(`discord.log`);
const {api} = require(`../../config.json`);
const discord = new Discord(api);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unbans a banned user from the server Usage: /unban <user> <reason>')
        .addStringOption(option => option.setRequired(true)
        .setName('userid')
        .setDescription('The user to unban'))
        .addStringOption(option => option.setName('reason')
        .setDescription('The reason for unbaning the user')),
	async execute(interaction) {
    try{
        const member = interaction.options.getString('userid');
        let reason = interaction.options.getString('reason');
        if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply('You cannot ban members')
  
        if (!member) return interaction.reply('Please specify a member for me to unban them')
        if (!reason) reason = 'No Reason Given';
        try{         
        await interaction.guild.members.unban(member, reason).catch(err => discord.log(err));
        }catch(err){
            return interaction.reply('This member is not banned')
        }
        
        try{
            interaction.member.guild.channels.cache
          .find((i) => i.name === "utily-logs")
          .send(
            `${member} unbanned by ${interaction.member.displayName}! | Reason: ${reason}`
          ).catch(err => discord.log(err));
        }catch(err){
            discord.log(err);
        }
        
        return interaction.reply({content: `Successfully unbanned ${member}`, ephemeral: true});
        }catch(err){
        discord.log(err);
        interaction.reply("An error ocurred:"+err);
      }
	},
};