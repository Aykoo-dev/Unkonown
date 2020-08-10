const {Command} = require('../../structures/Command');

module.exports = class userInfo extends Command {
    constructor(client) {
        super(client, {
            name: "permissions",
            aliases: ["perm", "perms"],
            examples: [],
            description: ".",
            cooldown: 5,
            owner: false,
            args: false
        });
    }

    async exec(message, argv) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(argv[0]) || message.member;

        return message.channel.send({
            embed: {
                color: message.client.colors.invisible,
                description: `\`\`\`\nADMIN                 ➜ ${member.hasPermission("ADMINISTRATOR") ? '✅' : '❌'} \nRÔLES                 ➜ ${member.hasPermission("MANAGE_ROLES") ? '✅' : '❌'} \nINVITE                ➜ ${member.hasPermission("CREATE_INSTANT_INVITE") ? '✅' : '❌'} \nKICK                  ➜ ${member.hasPermission("KICK_MEMBERS") ? '✅' : '❌'} \nBAN                   ➜ ${member.hasPermission("BAN_MEMBERS") ? '✅' : '❌'}\`\`\``
            }
        })
    }
};