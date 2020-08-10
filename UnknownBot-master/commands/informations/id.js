const {Command} = require('../../structures/Command');

module.exports = class id extends Command {
    constructor(client) {
        super(client, {
            name: "id",
            aliases: [],
            examples: [],
            description: "Permet de connaitre l'ID d'un utilisateur",
            cooldown: 5,
            owner: false,
            args: false
        });
    }

    async exec(message, argv) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(argv[0]) || message.member;

        await message.channel.send({
            embed: {
                color: 3553599,
                description: `** ID : ${user.id}**`
            }
        })
    }
};
