const { SlashCommandBuilder } = require('@discordjs/builders');
const { User } = require('discord.js');
const Discord = require(`discord.log`);
const {api} = require(`../../config.json`);
const discord = new Discord(api);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks a user from the server Usage: /kick <user> <reason>')
        .addMentionableOption(option => option.setRequired(true)
        .setName('user')
        .setDescription('The user to kick'))
        .addStringOption(option => option.setName('reason')
        .setDescription('The reason for kicking the user')),
	async execute(interaction) {
    try{
        const member = interaction.options.getMentionable('user');
        let reason = interaction.options.getString('reason');
        if (!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.reply('You cannot kick members')
  
        if (!member) return interaction.reply('Please specify a member for me to kick them')
        if (!reason) reason = 'No Reason Given';
        if (!member.kickable) return interaction.reply('This member is not kickable')
        
        member.kick(reason).catch(err => discord.log(err));
        member.send(`You have been kicked from ${interaction.guild.name} for: ${reason}`).catch(err => discord.log(err));
        
        try{
            member.guild.channels.cache
          .find((i) => i.name === "utily-logs")
          .send(
            `${member} kicked by ${interaction.member.displayName}! | Reason: ${reason}`
          ).catch(err => discord.log(err));
        }catch(err){
            discord.log(err);
        }
        
        return interaction.reply({content: `Successfully kicked ${member}`, ephemeral: true});
        }catch(err){
        discord.log(err);
        interaction.reply("An error ocurred:"+err);
      }
	},
};