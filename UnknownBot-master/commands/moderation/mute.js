const {Command} = require('../../structures/Command');

module.exports = class mute extends Command {
    constructor(client) {
        super(client, {
            name: "mute",
            aliases: [],
            examples: [],
            description: "Permet de mute une personne.",
            cooldown: 5,
            owner: false,
            args: false
        });
    }

    async exec(message, argv) {
        let toMute = message.mentions.members.first();

        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x:‎• **Vous n'avez pas la permission d'utiliser cette commande.**"
                }
            })
                .then(m => m.delete(5000));
        }
        if (!toMute) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x: ‎• **Veuillez mentionner la personne a muter.**"
                }
            })
        }

        if (message.member.roles.highest.position < message.guild.members.cache.find(m => m.id === toMute.user.id).roles.highest.position) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x: ‎• **Le rôle le plus haut de cet utilisateur est plus haut que le vôtre, je ne peux pas faire ça.**"
                }
            })
        }
        let clientMember = message.guild.members.cache.find(m => m.id === message.client.user.id)
        if (clientMember.roles.highest.position < message.guild.members.cache.find(m => m.id === toMute.user.id).roles.highest.position) {
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
                .then(m => m.delete(5000));
        }
        if (toMute.user.id === message.author.id) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x: ‎• **Vous ne pouvez pas vous mute vous meme.**"
                }
            })
        }

        let raison = argv.slice(1).join(" ");
        if (!raison) {
            raison = "Pas de raison fournis."
        }


        message.guild.channels.cache.forEach((channel) => {
            let permissionOverwrites = channel.permissionOverwrites.get(toMute.user.id);
            if (!permissionOverwrites) {
                channel.createOverwrite(toMute.user, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            }
        });

        await modLogs(message, toMute)

        async function modLogs(message, toMute) {
            await message.channel.send({
                embed: {
                    color: 3553599,
                    description: ` ‎• **<@${toMute.user.id}> a été mute(e) avec succès !**`
                }
            })

            toMute.user.send({
                embed: {
                    color: 3553599,
                    description: " ‎• Vous avez été mute(e) dans **" + message.guild.name + "**. Raison : " + raison + ""
                }
            }).catch(() => {
                return message.channel.send({
                    embed: {
                        color: 3553599,
                        description: ":x: ‎• Malheureusement cette utilisateur a bloquer ces mp :(. Je ne pourrais donc pas l'avertir de sont mute."
                    }
                })
                    .then(m => m.delete({
                        timeout: 5000
                    }));
            })
        }
    }
};
