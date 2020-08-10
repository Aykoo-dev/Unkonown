module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async exec (message) {
        try {
            if (!message.guild) return;
            if (message.author.bot) return;
            const data = await this.client.database.models.guilds.findOne({
                where: {
                    guildID: message.guild.id
                }
            });
            if (!data) return;
            message.prefix = data.dataValues.prefix;

            const args = message.content.slice(message.prefix.length).trim().split(/ +/g);
            const command = args.shift();

            const prefixMention = new RegExp(`^<@!?${this.client.user.id}>( |)$`);
            if (message.content.match(prefixMention)) {
                return message.channel.send(`** ${message.guild.name} Prefix : \`${message.prefix}\`**`);
            }
            if (message.content.indexOf(message.prefix) !== 0) return;
            if (message.guild && !message.member) await message.guild.members.fetch(message.author);
            const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
            if (!cmd) return;

            let isOwner;
            if (!this.client.config.owners.includes(message.author.id))  { isOwner = true } else { isOwner = true; }

            await this.client.monitors.exec('Command', message, args, cmd, isOwner)
        }

        catch (e) {
            console.log(e)
        }
    }
};