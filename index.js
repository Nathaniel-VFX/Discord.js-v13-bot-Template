const Discord = require('discord.js')
const client = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: 32767,
});
const config = require('./config.json');
const prefix = config.prefix


client.on("ready", () => {
    setInterval(() => {
			const activities = [
				{ name: `${client.channels.cache.size} Channels`, type: 'PLAYING' },
				{ name: `${client.users.cache.size} Users`, type: 'WATCHING' },
				{ name: `${client.users.cache.size} Servers`, type: 'LISTENING' },
				{ name: `${client.user.tag}`, type: 'COMPETING' },
				{ name: `${client.user.tag}`, type:"STREAMING", url: "https://www.youtube.com/watch?v=l0vpQwkA2cE" },
			];
			client.user.setActivity(activities[Math.floor(Math.random() * activities.length)])
    }, 10000); // 10 seconds in ms
    client.user.setStatus('online')
		console.log(`Logged in as ${client.user.tag}!`)
});

client.on('messageCreate', async message => {
    if(message.author.bot) return;
    msg = message.content.toLowerCase();
    if(msg.startsWith(prefix + 'ping')) {
        const msg = await message.channel.send('Pinging...')
        await msg.edit(`Pong! **${client.ws.ping} ms**`)
    }
});

client.login(process.env.TOKEN) // process.env['TOKEN']