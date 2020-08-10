const {Command} = require('../../structures/Command');

module.exports = class prefix extends Command {
    constructor(client) {
        super(client, {
            name: "prefix",
            aliases: ["p"],
            examples: ["prefix <prefix>"],
            description: "Pour changer le prefix sur un serveur ou la commande et execute",
            cooldown: 3,
            owner: false,
            args: false
        });
    }

    async exec(message, argv) {
        if (!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== message.client.config.unk) return message.channel.send({
            embed: {
                color: 0x2f3136,
                description: ":x: - Vous n'avez pas la permission nécessaire pour utiliser cette commande. `ADMINISTRATEUR`"
            }
        }).then(m => m.delete({
            timeout: 10000
        })).catch((error) => console.error(error));
        let prefix = argv[0];
        if (!prefix) return message.channel.send({
            embed: {
                color: 0x2f3136,
                description: ":x: - Veuillez spécifiez le nouveau prefix !"
            }
        }).then(m => m.delete({
            timeout: 10000
        })).catch((error) => console.error(error));
        if (message.prefix === prefix) return message.channel.send({
            embed: {
                color: 0x2f3136,
                description: ":x: - Le prefix spécifiez est le même que le prefix actuel !"
            }
        }).then(m => m.delete({
            timeout: 10000
        })).catch((error) => console.error(error));
        if (prefix.length > 5) return message.channel.send({
            embed: {
                color: 0x2f3136,
                description: ":x: - Le prefix spécifiez contient trop de caractères (5 caractères max.) !. "
            }
        }).then(m => m.delete({
            timeout: 10000
        })).catch((error) => console.error(error));
        await message.client.database.models.guilds.update({
            prefix: prefix
        }, {
            where: {
                guildID: message.guild.id
            },
            fields: ["prefix"]
        });
        return message.channel.send({
            embed: {
                color: 0x2f3136,
                description: "- Prefix mis a jour avec succès !"
            }
        }).catch((error) => console.error(error));
    }
};
