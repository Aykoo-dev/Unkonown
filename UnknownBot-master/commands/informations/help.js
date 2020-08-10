const {Command} = require('../../structures/Command');

module.exports = class prefix extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            aliases: [],
            examples: [],
            description: "Pour connaitre les commandes",
            cooldown: 5,
            owner: false,
            args: false
        });
    }

    async exec(message, argv) {
        if (argv.length !== 0) {
            const cmd = message.client.commands.get(argv[0]) || message.client.commands.get(message.client.aliases.get(argv[0]));
            if (!cmd) return message.channel.send('Commande inconnue !');

            return message.channel.send({
                embed: {
                    color: 0x7289da,
                    title: `Commande : ${cmd.help.name}`,
                    author: {
                        name: message.author.username,
                        icon_url: message.author.displayAvatarURL()
                    },
                    description: "**Description : **" + `${!cmd.help.description ? 'Aucune.' : cmd.help.description}` + "\n**Rappel : **Les <> et [] ne sont pas à inclure dans l'utilisation de la commande.",
                    url: `https://user.x-bot.fr/${message.author.id}`,
                    fields: [
                        {
                            name: "**Alias**",
                            value: cmd.config.aliases.length === 0 ? 'Aucun.' : "`" + cmd.config.aliases.join("`, `") + "`"
                        },
                        {
                            name: "**Examples**",
                            value: cmd.config.examples.length === 0 ? 'Aucun.' : cmd.config.examples.join(", \n")
                        },
                        {
                            name: "**Cooldown**",
                            value: cmd.config.cooldown + " seconde."
                        },
                        {
                            name: "**Propriétaire uniquement**",
                            value: `${cmd.config.owner ? 'Oui.' : 'Non.'} `
                        }
                    ],
                    timestamp: Date.now(),
                    footer: {
                        text: "UnknownBot©",
                        icon_url: message.client.user.displayAvatarURL()
                    }
                }
            })
        } else {
            return message.channel.send({
                embed: {
                    color: 0x7289da,
                    author: {
                        name: message.author.username,
                        icon_url: message.author.displayAvatarURL()
                    },
                    description: "Vous pouvez utiliser `" + message.prefix + "help <commande>` pour avoir plus d'informations sur une commande. \n**Exemple : **`" + message.prefix + "help mute` \n**Rappel : **Les <> et [] ne sont pas à inclure dans l'utilisation de la commande.",
                    fields: [
                        {
                            name: "**Administration (1)**",
                            value: "`prefix`"
                        },
                        {
                            name: "**Informations (8)**",
                            value: "`help`, `serverinfo`, `userinfo`, `roleinfo`, `channelinfo`, `botinfo`, `ping`, `avatar`, `id`"
                        },
                        {
                            name: "**Modération (5)**",
                            value: "`ban`, `unban`, `kick`, `mute`, `unmute`"
                        },
						  {
                            name: "**Fun (17)**",
                            value: " `manga`, `pat`, `slap`, `joke`, `spang`, `smug`, `tmush`, `woll`, `tikel`, `hug`, `hug-anime`, `kiss`, `wosh`, `feed`, `love + [USER]`, `pang`, `maried`"
                        }
                    ],
                    timestamp: Date.now(),
                    footer: {
                        text: "UnknownBot©",
                        icon_url: message.client.user.displayAvatarURL()
                    }
                }
            })
        }
    }
};
