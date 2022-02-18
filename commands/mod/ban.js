const { SlashCommandBuilder } = require('@discordjs/builders');
const { User } = require('discord.js');
const Discord = require(`discord.log`);
const {api} = require(`../../config.json`);
const discord = new Discord(api);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans a user from the server Usage: /ban <user> <reason>')
        .addMentionableOption(option => option.setRequired(true)
        .setName('user')
        .setDescription('The user to ban'))
        .addStringOption(option => option.setName('reason')
        .setDescription('The reason for baning the user')),
	async execute(interaction) {
    try{
        const member = interaction.options.getMentionable('user');
        let reason = interaction.options.getString('reason');
        if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply('You cannot ban members')
  
        if (!member) return interaction.reply('Please specify a member for me to ban them')
        if (!reason) reason = 'No Reason Given';
        if (!member.bannable) return interaction.reply('This member is not banable')
        
        member.ban({reason: reason}).catch(err => discord.log(err));
        return interaction.reply({content: `Successfully baned ${member}`, ephemeral: true});
        }catch(err){
        discord.log(err);
        interaction.reply("An error ocurred:"+err);
      }
	},
};