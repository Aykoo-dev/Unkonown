const {Command} = require('../../structures/Command'),
    { MessageEmbed } = require('discord.js'),
    moment = require("moment");

module.exports = class userInfo extends Command {
    constructor(client) {
        super(client, {
            name: "userinfo",
            aliases: ["ui"],
            examples: [],
            description: "Permet de collecter des informations sur un utilisateur.",
            cooldown: 5,
            owner: false,
            args: false
        });
    }

    async exec(message, argv) {
        moment.locale('fr');
        let flags = [];
        let no = [];
        let member = message.mentions.members.first() || message.guild.members.cache.get(argv[0]) || message.member;
        let user = member.user;
        if (user.flags) {
            /** Discord Employee */ user.flags.has(1 << 0) ? flags.push('<:d_staff:737334496550191156>') : no.push('No.');
            /** Discord Partner */ user.flags.has(1 << 1) ? flags.push('<:d_partner:737334557883498549>') : no.push('No.');
            /** HypeSquad Events */ user.flags.has(1 << 2) ? flags.push('<:d_event_squad:737334642507645019>') : no.push('No.');
            /** Bug Hunter Level 1 */ user.flags.has(1 << 3) ? flags.push('<:d_bug_hunter_one:737334734937653340>') : no.push('No.');
            /** House Bravery */ user.flags.has(1 << 6) ? flags.push('<:d_bravery_squad:737334837299511316>') : no.push('No.');
            /** House Brilliance */ user.flags.has(1 << 7) ? flags.push('<:d_brillance_squad:737334993788862486>') : no.push('No.');
            /** House Balance */ user.flags.has(1 << 8) ? flags.push('<:d_balance_squad:737335199565611100>') : no.push('No.');
            /** Early Supporter */ user.flags.has(1 << 9) ? flags.push('<:d_supporter:737335089649680465>') : no.push('No.');
            /** Bug Hunter Level 2 */ user.flags.has(1 << 14) ? flags.push('<:d_bug_hunter_two:737335298190737559>') : no.push('No.');
            /** Verified Bot */ user.flags.has(1 << 16) ? flags.push('<:d_verified_bot:737335459696607243>') : no.push('No.');
            /** Verified Bot Developer */  user.flags.has(1 << 17) ? flags.push('<:d_verified_dev:737335542743564358>') : no.push('No.');
            /** Discord Nitro Classic */  user.avatar.startsWith('a_') ? flags.push('<:d_nitro:737337127284637807>') : no.push('No.');
        } else {
            flags.push('Aucun.')
        }

// !member.presence.activities[0] && !member.presence.activities[1] ? 'Aucune.' : member.presence.activities[0] && !member.presence.activities[1] ? member.presence.activities[0].state :  !member.presence.activities[0] && member.presence.activities[1] ? member.presence.activities[1].state : member.presence.activities[0] && member.presence.activities[1] ?
        const embed = new MessageEmbed()
            .setDescription(`<@${member.user.id}>`)
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({
                dynamic: true
            }))
            .setColor(member.roles.highest.color)
            .setFooter(`ID: ${message.author.id}`)
            .setThumbnail(member.user.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp()
            .addField('Badges : ', "**" + flags + "**", true)
            .addField("Status", member.user.bot ? 'Cannot fetch status.' : !member.presence.activities[0] ? 'Acune.' : member.presence.activities[0].state,true)
            .addField('Rejoin le : ', `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
            .addField("Compte crée le : ", `${moment(message.author.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
            .addField("Administrateur : ", member.hasPermission("ADMINISTRATOR") ? "Oui." : 'Non.', true)
            .addField(`Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **,**") || "Aucun rôle."}`, true)
        await message.channel.send(embed)
    }
};