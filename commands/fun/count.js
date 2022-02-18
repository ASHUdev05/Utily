const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require(`discord.log`);
const {api} = require(`../../config.json`);
const discord = new Discord(api);
const Keyv = require('keyv');
const keyv = new Keyv('sqlite://database.sqlite');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('count')
		.setDescription('Sweet old counting game! Usage: /count amount: <number>')
        .addIntegerOption(option => 
            option.setName('amount')
            .setDescription('The amount of messages to delete.')
            .setRequired(true)),
	async execute(interaction) {
        let num = interaction.options.getInteger('amount');
        keyv.on('error', err => console.error('Keyv connection error:', err));

        let atemp = await keyv.get(interaction.channel.id);
        if((atemp == null || atemp == undefined || atemp == NaN) && num>1) {
            return interaction.reply('No game running in this channel!');
        }
    
    
    
    if (!num) return interaction.reply(`Enter a number! (preferably 0)`);

    // If a game doesn't exist, add user to the Set and send message that a new game started
    if (num - 1 === 0 && atemp == null) {
      if (num !== 1) return interaction.reply(`The game must start at **1**!`);
      await keyv.set(interaction.channel.id, num);
      let temp = await keyv.get(interaction.channel.id);
      return interaction.reply(
        `**${interaction.member.user.tag}** has started a game! Current count is at **${temp}**.`
      );
      // Is user enters incorrect number, end the game (clear the Set)
    } else if (num !== atemp + 1) {
      await keyv.delete(interaction.channel.id);
      return interaction.reply(
        `:frowning: **${interaction.member.user.tag}** has ended the game by entering **${num}**.`
      );
      // If a game is ongoing, add user to the Set
    } else {
      await keyv.set(interaction.channel.id, num);
      let temp = await keyv.get(interaction.channel.id);
      return interaction.reply(
        `**${interaction.member.user.tag}** has counted! Game is now at **${temp}**.`
      );
    }
	},
};