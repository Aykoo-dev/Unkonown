const {Command} = require('../../structures/Command'),
    { MessageEmbed } = require('discord.js');

module.exports = class serverInfo extends Command {
    constructor(client) {
        super(client, {
            name: "serverinfo",
            aliases: ["si"],
            examples: [],
            description: "Permet de collecter des informations sur ce serveur",
            cooldown: 5,
            owner: false,
            args: false
        });
    }

    async exec(message) {
        const role = message.guild.roles.cache.size;
        const online = message.guild.members.cache.filter(m => m.presence.status !== 'offline').size
        const embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor(message.client.colors.invisible)
            .setThumbnail(message.guild.iconURL())
            .setDescription(`Owner: ${message.guild.owner.user.tag} (${message.guild.owner.id})`)
            .addField('Member Count', `${message.guild.memberCount}`, true)
            .addField('Online', `${online}`, true)
            .addField('Server Region', message.guild.region)
            .addField('Created At', message.guild.createdAt.toLocaleString(), true)
            .addField("Verification Level: ", `${message.guild.verificationLevel}`)
            .addField('Voice Channels', `${message.guild.channels.cache.filter(chan => chan.type === 'voice').size}`)
            .addField('Text Channels', `${message.guild.channels.cache.filter(chan => chan.type === 'text').size}`, true)
            .addField('Roles', role, true)
        await message.channel.send({ embed })
    }
};
