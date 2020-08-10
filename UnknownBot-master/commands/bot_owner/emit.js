const {Command} = require('../../structures/Command');

module.exports = class emit extends Command {
    constructor(client) {
        super(client, {
            name: "emit",
            aliases: [],
            examples: [],
            description: ".",
            cooldown: 5,
            owner: true,
            args: false
        });
    }

    async exec(message, argv) {
        message.client.shard.fetchClientValues('shard').then(console.log);
    }
};
