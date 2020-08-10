module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async exec(guild) {
        try {
            await this.client.database.models.guilds.create({
                    guildID: guild.id
                },
                {
                    fields: ["guildID"]
                });

            let logChannel = this.client.channels.cache.find(c => c.id === this.client.config.guildLogChannel);
            logChannel.send({
                embed: {
                    color: this.client.colors.invisible,
                    author: {
                        name: this.client.user.name,
                        icon_url: this.client.user.displayAvatarURL()
                    },
                    description: ` Merci à **${guild.name}** d'avoir ajouté ${this.client.user.username}`,
                    fields: [
                        {
                            name: " __Nom du serveur__",
                            value: guild.name,
                            inline: true
                        },
                        {
                            name: " __Nombre de membres__ :",
                            value: guild.memberCount,
                            inline: true
                        },
                        {
                            name: " __Nombre de salons__ :",
                            value: guild.channels.cache.size,
                            inline: true
                        },
                        {
                            name: " __Propriétaire__ :",
                            value: guild.owner,
                            inline: true
                        },
                        {
                            name: " __Région du serveur__ :",
                            value: guild.region,
                            inline: true
                        },
                        {
                            name: " __ID du serveur__ :",
                            value: guild.id,
                            inline: true
                        }
                    ]
                }
            }).catch((e) => this.client.logger.error(e));
        } catch (e) {
            console.log(e)
        }
    }
};