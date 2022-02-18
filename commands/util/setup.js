const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require(`discord.log`);
const {api} = require(`../../config.json`);
const discord = new Discord(api);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Sets up the bot'),
	async execute(interaction) {
        try{
            if (interaction.member.permissions.has('ADMINISTRATOR') || interaction.member.permissions.has('MANAGE_GUILD')) {
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
                type: 'text',
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ['VIEW_CHANNEL'],
                    },
                    {
                        id: interaction.user.id,
                        allow: ['VIEW_CHANNEL'],
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
                          VIEW_CHANNEL: false,
                          SEND_MESSAGES: false,
                          MANAGE_MESSAGES: false,
                          ADD_REACTIONS: false
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