const {Command} = require('../../structures/Command'),
    { MessageEmbed } = require('discord.js');

module.exports = class botInfo extends Command {
    constructor(client) {
        super(client, {
            name: "botinfo",
            aliases: ["bi"],
            examples: [],
            description: "Permet de connaitre les info sur le bot ",
            cooldown: 5,
            owner: false,
            args: false
        });
    }

    async exec(message) {
        let servers = message.client.guilds.cache.size;
        let users = message.client.users.cache.size;

        const info = new MessageEmbed()
            .setColor(message.client.colors.invisible)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .addField(`Version`,`1.0`, true)
            .addField(`Library`,`Discord.js` , true)
            .addField(`Creator`,"**`Aykoo ?#0001`**, **`Aykoo#1337`**", true)
            .addField(`Servers`, `${servers}`, true)
            .addField(`Users`, `${users}`, true)
            .addField(`Invite`, `Bot prive `, true)

        await message.channel.send(info);
    }
};