const {Command} = require('../../structures/Command');

module.exports = class kick extends Command {
    constructor(client) {
        super(client, {
            name: "kick",
            aliases: [],
            examples: [],
            description: "Kick un membre.",
            cooldown: 5,
            owner: false,
            args: false
        });
    }

    async exec(message, argv) {
        let toKick = message.mentions.members.first() || message.guild.members.cache.get(argv[0]);

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x:‎• **Vous n'avez pas la permission d'utiliser cette commande.**"
                }
            })
                .then(m => m.delete(5000));
        }

        if (!toKick) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x: ‎• **Je n'arrive pas à trouver la personne a kick. Ressayez !**"
                }
            })
                .then(m => m.delete(5000));
        }

        if (message.member.roles.highest.position < message.guild.members.cache.find(m => m.id === toKick.user.id).roles.highest.position) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x: ‎• **Le rôle le plus haut de cet utilisateur est plus haut que le vôtre, je ne peux pas faire ça.**"
                }
            })
        }
        let clientMember = message.guild.members.cache.find(m => m.id === message.client.user.id)
        if (clientMember.roles.highest.position < message.guild.members.cache.find(m => m.id === toKick.user.id).roles.highest.position) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x: ‎• **Le rôle le plus haut de cet utilisateur est plus haut que le miens, je ne peux pas faire ça.**"
                }
            })
        }
        if (!clientMember.hasPermission("KICK_MEMBERS")) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x:‎• **Je n'ai pas la permission d'utiliser cette commande.**"
                }
            })
                .then(m => m.delete(5000));
        }
        if (toKick.id === message.author.id) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x: ‎• **Vous ne pouvez pas vous kick vous meme.**"
                }
            })
        }

        let raison = argv.slice(1).join(" ");
        if (!raison) {
            raison = "Pas de raison fournis."
        }



        await modLogs(message, toKick)

        async function modLogs(message, toKick) {
            await message.channel.send({
                embed: {
                    color: 3553599,
                    description: ` ‎• **<@${toKick.user.id}> a été kick avec succès !**`
                }
            })

            toKick.user.send({
                embed: {
                    color: 3553599,
                    description: " ‎• Vous avez été kick dans **" + message.guild.name + "**. Raison : " + raison + ""
                }
            }).catch(() => {
                return message.channel.send({
                    embed: {
                        color: 3553599,
                        description: ":x: ‎• Malheureusement cette utilisateur a bloquer ces mp :(. Je ne pourrais donc pas l'avertir de sont kick."
                    }
                })
                    .then(m => m.delete({
                        timeout: 5000
                    }));
            })
            await toKick.kick();
        }
    }
};
