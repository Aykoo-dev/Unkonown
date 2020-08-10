const {Command} = require('../../structures/Command'),
    { MessageEmbed } = require('discord.js');

module.exports = class roleInfo extends Command {
    constructor(client) {
        super(client, {
            name: "roleinfo",
            aliases: ["ri"],
            examples: [],
            description: "Permet de collecter des informations sur un rôle.",
            cooldown: 5,
            owner: false,
            args: false
        });
    }

    async exec(message, argv) {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(argv[0]) || message.guild.roles.cache.find(r => r.name === argv.join(' '));

        if (!role) {
            return message.reply('Veuillez entrer un rôle valide.');
        }

        const roleEmbed = new MessageEmbed()
            .setColor(role.color)
            .setThumbnail(message.guild.iconURL())
            .setTitle('Role Info')
            .addField(':arrow_right: Nom', role.name, true)
            .addField(':arrow_right: ID', role.id, true)
            .addField(':arrow_right: Dâte de création', role.createdAt.toDateString(), true)
            .addField(':arrow_right: Mentionnable', role.mentionable ? 'Oui' : 'Non', true)

        await message.channel.send(roleEmbed);
    }
};
