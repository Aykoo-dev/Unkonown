const {Command} = require('../../structures/Command');

module.exports = class ban extends Command {
    constructor(client) {
        super(client, {
            name: "ban",
            aliases: [],
            examples: [],
            description: "Ban un utilisateur  du serveur",
            cooldown: 5,
            owner: false,
            args: false
        });
    }

    async exec(message, argv) {
        let toBan = message.mentions.members.first() || message.guild.members.cache.get(argv[0]);

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x:‎• **Vous n'avez pas la permission d'utiliser cette commande.**"
                }
            })
                .then(m => m.delete(5000));
        }

        if (!toBan) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x: ‎• **Je n'arrive pas à trouver la personne a bannir. Ressayez !**"
                }
            })
        }

        if (message.member.roles.highest.position < message.guild.members.cache.find(m => m.id === toBan.user.id).roles.highest.position) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x: ‎• **Le rôle le plus haut de cet utilisateur est plus haut que le vôtre, je ne peux pas faire ça.**"
                }
            })
        }

        let clientMember = message.guild.members.cache.find(m => m.id === message.client.user.id)
        if (clientMember.roles.highest.position < message.guild.members.cache.find(m => m.id === toBan.user.id).roles.highest.position) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x: ‎• **Le rôle le plus haut de cet utilisateur est plus haut que le miens, je ne peux pas faire ça.**"
                }
            })
        }
        if (!clientMember.hasPermission("BAN_MEMBERS")) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x:‎• **Je n'ai pas la permission d'utiliser cette commande.**"
                }
            })
                .then(m => m.delete(5000));
        }

        if (!toBan.bannable) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x:‎• **Je n'ai pas la permission d'utiliser cette commande.**"
                }
            })
                .then(m => m.delete(5000));
        }
        if (toBan.id === message.author.id) {
            return message.channel.send({
                embed: {
                    color: 3553599,
                    description: ":x: ‎• **Vous ne pouvez pas vous ban vous meme.**"
                }
            })
        }

        let raison = argv.slice(1).join(" ");
        if (!raison) {
            raison = "Pas de raison fournis."
        }

        await modLogs(message, toBan)

        async function modLogs(message, toBan) {
            await message.channel.send({
                embed: {
                    color: 3553599,
                    description: ` ‎• **<@${toBan.user.id}> a été banni(e) avec succès !**`
                }
            });

            toBan.user.send({
                embed: {
                    color: 3553599,
                    description: " ‎• Vous avez été banni(e) dans **" + message.guild.name + "**. Raison : " + raison + ""
                }
            }).catch(() => {
                return message.channel.send({
                    embed: {
                        color: 3553599,
                        description: ":x: ‎• Malheureusement cette utilisateur a bloquer ces mp :(. Je ne pourrais donc pas l'avertir de sont bannissement."
                    }
                })
            })
            await toBan.ban();

        }

    }
};
