const {Command} = require('../../structures/Command'),
    { MessageAttachment } = require('discord.js');

module.exports = class avatar extends Command {
    constructor(client) {
        super(client, {
            name: "avatar",
            aliases: ["pp", "av"],
            examples: [],
            description: "Permet d'afficher la photo de profil de la personne mentionne",
            cooldown: 5,
            owner: false,
            args: false
        });
    }

    async exec(message, argv) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(argv[0]) || message.member;
        let avatar = new MessageAttachment(member.user.displayAvatarURL({
            dynamic: true
        }));
        return message.channel.send(`**Voici l'avatar de  ${member.user.tag} :**`, avatar)
    }
};
