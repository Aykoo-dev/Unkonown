const {Command} = require('../../structures/Command');

module.exports = class unmute extends Command {
    constructor(client) {
        super(client, {
            name: "unmute",
            aliases: [],
            examples: [],
            description: "Permet de unmute une personne",
            cooldown: 5,
            owner: false,
            args: false
        });
    }

    async exec(message, argv) {
        let toUnMute = message.mentions.members.first() || message.guild.members.cache.get(argv[0]);

        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x: - Vous n'avez pas la permission d'utiliser cette commande."
                }
            })
        }
        if (!toUnMute) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x: - Mentionner un utilisateur à unmute!."
                }
            })
        }

        let clientMember = message.guild.members.cache.find(m => m.id === message.client.user.id)
        if (clientMember.roles.highest.position < message.guild.members.cache.find(m => m.id === toUnMute.user.id).roles.highest.position) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x: ‎• **Le rôle le plus haut de cet utilisateur est plus haut que le miens, je ne peux pas faire ça.**"
                }
            })
        }
        if (!clientMember.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x:‎• **Je n'ai pas la permission d'utiliser cette commande.**"
                }
            })
                .then(m => m.delete({
                    timeout: 5000
                }));
        }
        message.guild.channels.cache.forEach((channel) => {
            let permissionOverwrites = channel.permissionOverwrites.get(toUnMute.user.id);
            if (permissionOverwrites) permissionOverwrites.delete();
        });
        await message.channel.send({
            embed: {
                color: 3553599,
                description: "- Cette utilisateur est désormais démute !"
            }
        })
    }
};
