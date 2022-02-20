const { ActivityType } = require('discord.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Tags = sequelize.define('count', {
	server: Sequelize.STRING,
    count: Sequelize.INTEGER,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
        Tags.sync();
		client.user.setStatus("idle");
    var activities = [ `${client.guilds.cache.size} servers`, `${client.users.cache.size} users!`, `v0.0.0 [pre-release]`, 'preparing magic potions!' ], i = 0;
    setInterval(() => client.user.setActivity(`\/help help | ${activities[i++ % activities.length]}`, { type: ActivityType.Playing }),5000)
	},
};