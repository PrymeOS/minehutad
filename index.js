console.log("importing packages...")
const mineflayer = require('mineflayer')
const discord = require('discord.js')
const config = require('./config.json')

console.log("logging in...")
const client = new discord.Client()
const bot = mineflayer.createBot({
	host: "minehut.com",
	username: config.minecraft_username,
	password: config.minecraft_password
})

console.log("starting chat listener...")
bot.on('messagestr', (message, messagePosition, jsonMsg) => {
	if (message.startsWith("[AD]") && message.toLowerCase().includes("/join "+config.server_name)) {
		var msg = message.split("[AD] ").pop().split(": /join")[0]
		client.channels.cache.get(config.discord_channel).send(msg)
	}
})

console.log("starting error listener...")
bot.on('kicked', console.log)
bot.on('error', console.log)

console.log("starting discord bot...")
client.login(config.discord_token)