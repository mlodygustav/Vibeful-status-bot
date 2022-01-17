// Do you need help? Join on discord: discord.gg/rrHFBmf
const { Client, Intents, MessageEmbed } = require('discord.js');
const config = require('./config.json')
const request = require('request');
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once('ready', () => {
    function ServerStatus() {
        const options = {
            url: config.ServerURL
        };

        function callback(error, response, body) {
            const ChannelName = client.channels.cache.find(channel => channel.name === (config.ChannelName))

            if (!error && response.statusCode == 200) {
                const info = JSON.parse(body);
                const players = Object.keys(info).length

                ChannelName.messages.fetch(config.MessageID).then(message => {
                    const StatusMessage = new MessageEmbed()
                    
                    .setTitle('Fivem Server Status')
                    .setColor('#a082ff')
                    .addFields(
                        { name: 'Server status', value: 'Online ✅', inline: true },
                        { name: 'Players', value: `${players}/128`, inline: true },
                    )
                    .setFooter({text: 'Last update:'})
                    .setTimestamp()

                    message.edit({embeds: [StatusMessage]});
                })

                client.user.setActivity(`Players: ${players}`, {type: 'WATCHING'});
            } else {
                ChannelName.messages.fetch(config.MessageID).then(message => {
                    const StatusMessage = new MessageEmbed()
                    
                    .setTitle('Fivem Server Status')
                    .setColor('#a082ff')
                    .addFields(
                        { name: 'Server status', value: 'Offline ❌', inline: true },
                        { name: 'Players', value: `0/0`, inline: true },
                    )
                    .setFooter({text: 'Last update:'})
                    .setTimestamp()

                    message.edit({embeds: [StatusMessage]});
                })
            }
        }
        request(options, callback)
    }
    setInterval(ServerStatus, 30000);
});

// After setting up the bot, you can delete lines 61-70
client.on('messageCreate', function(message) {
    if (message.content === 'statusembed') {
        const statusembed = new MessageEmbed()
        .setTitle('Vibeful - Fivem Server Status')
        .setDescription('Enter the ID of this message in the config.')

        message.channel.send({embeds: [statusembed]});
    }
});

client.login(config.Token);
// Do you need help? Join on discord: discord.gg/rrHFBmf