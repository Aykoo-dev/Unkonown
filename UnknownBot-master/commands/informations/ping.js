const {Command} = require('../../structures/Command');

module.exports = class ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            aliases: [],
            examples: [],
            description: "Connaitre le ping du bot",
            cooldown: 5,
            owner: false,
            args: false
        });
    }

    async exec(message) {
        const m = await message.channel.send("Ping?");
        await m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ws.ping)}ms`);
    }
};
