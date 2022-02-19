const { SlashCommandBuilder } = require('@discordjs/builders');
const { BaseGuildTextChannel, ChannelType } = require('discord.js');
const Discord = require(`discord.log`);
const {api} = require(`../../config.json`);
const discord = new Discord(api);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Sets up the bot! Usage: /setup'),
	async execute(interaction) {
        try{
            if (interaction.member.permissions.has('Administrator') || interaction.member.permissions.has('ManageGuild')) {
                if ((interaction.guild.channels.cache.find(c => c.name.toLowerCase() === 'utily-logs'))) {
                    return interaction
                      .reply(
                        "Mod-logs setup already exists, to reset everything delete" +
                          interaction.guild.channels.cache
                            .find((channel) => channel.name === "utily-logs")
                            .toString() +
                          " !"
                      )
                      .catch((err) => discord.log(err));
                }
                let muteRole = interaction.guild.roles.cache.find(m => m.name === "Muted by Utily");
                if (muteRole) {
                    return interaction.reply('Muted role already exists, to reset everything delete <@&' + muteRole.id + '>!')
                    .catch(err => discord.log(err));
                }
            await interaction.guild.channels.create('utily-logs', {
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: interaction.user.id,
                        allow: ['ViewChannel'],
                    },
                ],
            }).catch(e =>{ return interaction.reply("An error ocurred:"+e)})
            
            
                try {
                    muteRole = await interaction.guild.roles.create({
                       name: "Muted by Utily",
                       color: "#000000",
                       permissions:[]
                    });
          
                    interaction.guild.channels.cache.forEach(async (channel) => {
                       await channel.permissionOverwrites.create(muteRole, {
                          ViewChannel: false,
                          SendMessages: false,
                          ManageMessages: false,
                          AddReactions: false
                       });
                    });
                 } catch(e) {
                 discord.log(e.stack);
                 return;
               }
    
               return interaction.reply(`Setup Success!`)
                .catch(err => discord.log(err));
        }
          }catch(err){
            discord.log(err);
            return interaction.reply("An error ocurred:"+err);
          }
	},
};