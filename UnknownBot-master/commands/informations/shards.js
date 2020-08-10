const {Command} = require('../../structures/Command'),
    {MessageEmbed} = require('discord.js');

module.exports = class shards extends Command {
    constructor(client) {
        super(client, {
            name: "shards",
            aliases: ["shlist", "shardslist"],
            examples: [],
            description: ".",
            cooldown: 5,
            owner: false,
            args: false
        });
    }

    async exec(message) {

        let clientShards = await message.client.shard.fetchClientValues('shard').catch(e => {
            return message.channel.send('Client shard are still being spawned. Please wait...')
        })
        let shardsIds = await message.client.shard.broadcastEval(`this.shard.ids`)
        let Websocket = await message.client.shard.fetchClientValues('ws.ping')
        let shardsEmbed = new MessageEmbed();
        shardsEmbed.setAuthor(message.author.username, message.author.displayAvatarURL(), `https://user.x-bot.fr/${message.author.id}`);
        shardsEmbed.setDescription(`${message.client.user.username} shards list. \n**NOTE :** you cane use **\`${message.prefix}\` details <shard-id>** for obtain more details.`);
        shardsEmbed.setColor(message.client.colors.invisible);
        for (let i = 0; i < clientShards.length; i++) {
            shardsEmbed.addField(`**Shard : ${shardsIds[i]} **`, `**ID :** ${shardsIds[i]} \n **Ping :** ${Websocket[i] > 200 ? `:heart: ${Websocket[i]}` : `:green_heart: ${Websocket[i]}`}ms \n**Users:** ${clientShards[i].client.users.length}\n**Guilds :** ${clientShards[i].client.guilds.length}`, true)
        }
        await message.channel.send(shardsEmbed);
    }
};