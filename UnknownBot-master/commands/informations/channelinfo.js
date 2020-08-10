const {Command} = require('../../structures/Command');

module.exports = class channelInfo extends Command {
    constructor(client) {
        super(client, {
            name: "channelinfo",
            aliases: ["ci"],
            examples: [],
            description: "Permet de connaitre les info sur un channel specefique",
            cooldown: 5,
            owner: false,
            args: false
        });
    }

    async exec(message, argv) {
        let channel = message.guild.channels.cache.find(c => c.id === argv.join(' ')) || message.guild.channels.cache.find(c => c.name === argv.join(' ')) || message.channel;
        await message.channel.send({
            embed: {
                color: 3553599,
                fields: [{
                    name: "Id",
                    value: channel.id,
                    inline: true
                },
                    {
                        name: "Nom du salon",
                        value: "#" + channel.name,
                        inline: true
                    },
                    {
                        name: "Type de salon",
                        value: channel.type,
                        inline: true
                    },
                    {
                        name: "Position",
                        value: channel.position,
                        inline: true
                    },
                    {
                        name: "Sujet",
                        value: !channel.topic ? 'Aucun.' : channel.topic,
                        inline: true
                    }
                ]
            }
        })
    }
};
