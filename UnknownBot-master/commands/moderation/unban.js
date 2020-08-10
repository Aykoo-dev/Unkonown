const {Command} = require('../../structures/Command');

module.exports = class unban extends Command {
    constructor(client) {
        super(client, {
            name: "unban",
            aliases: [],
            examples: [],
            description: "Permet de debanir une personne du serveur",
            cooldown: 5,
            owner: false,
            args: false
        });
    }

    async exec(message, argv) {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: "Vous n'avez pas la permission d'utiliser cette commande."
                }
            })
        }
        let toUnban = argv[0]
        message.guild.members.unban(toUnban)
            .then(user => {
                message.channel.send({
                    embed: {
                        color: 3553599,
                        description: `L'utilisateur \`${user.username}\` a été débanni`
                    }
                })
            })
            .catch(() => {
                return message.channel.send({
                    embed: {
                        color: 3553599,
                        description: "Une erreur est survenu lors du débanissement de l'utilisateur."
                    }
                })
            })
    }
};
