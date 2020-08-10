const {Command} = require('../../structures/Command');

module.exports = class prefix extends Command {
    constructor(client) {
        super(client, {
            name: "shard",
            aliases: [],
            examples: [],
            description: null,
            cooldown: 5,
            owner: false,
            args: false
        });
    }

    async exec(message) {
        return message.channel.send(`**${message.guild.name} shard : ** **\`${message.client.shard.ids} / ${message.client.shard.count}\`**`)
    }
};