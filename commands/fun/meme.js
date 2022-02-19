const { SlashCommandBuilder } = require('@discordjs/builders');
const got = require('got');
const { Embed } = require('discord.js');
const Discord = require(`discord.log`);
const {api} = require(`../../config.json`);
const discord = new Discord(api);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Provides yet another funny meme! Usage: /meme"),
  async execute(interaction) {
    const embed = new Embed();
	got('https://www.reddit.com/r/memes/random/.json')
		.then(response => {
			const [list] = JSON.parse(response.body);
			const [post] = list.data.children;

			const permalink = post.data.permalink;
			const memeUrl = `https://reddit.com${permalink}`;
			const memeImage = post.data.url;
			const memeTitle = post.data.title;
			const memeUpvotes = post.data.ups;
			const memeNumComments = post.data.num_comments;

			embed.setTitle(`${memeTitle}`);
			embed.setURL(`${memeUrl}`);
			embed.setColor(0x0099ff);
			embed.setImage(memeImage);
			embed.setFooter({ text: `👍 ${memeUpvotes} 💬 ${memeNumComments}` });

			return interaction.reply({ embeds: [embed] });
		}).catch(err => {
            discord.log(err);
        });
  },
};