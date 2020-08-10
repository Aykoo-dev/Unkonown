const {Command} = require('../../structures/Command'),
    {MessageEmbed} = require('discord.js');

module.exports = class test extends Command {
    constructor(client) {
        super(client, {
            name: "test",
            aliases: [],
            examples: [],
            description: ".",
            cooldown: 5,
            owner: true,
            args: false
        });
    }

    async exec(message) {

    }
};