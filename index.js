const fs = require('fs');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
exports.client = client;

client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands");

for (const folder of commandFiles) {
	const group = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of group) {
	const command = require(`./commands/${folder}/${file}`);
	client.commands.set(command.data.name, command);
	}
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


client.login(token);