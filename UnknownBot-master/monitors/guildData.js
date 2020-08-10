const chalk = require('chalk');

module.exports = class {
    constructor(client) {
        this.client = client;
    };

    async exec() {
        let guilds = this.client.guilds.cache.map(g => g.id);
        for (let i = 0; i < guilds.length; i++) {
            let guildData = await this.client.database.models.guilds.findOne({
                attributes: ["guildID"],
                where: {
                    guildID: guilds[i]
                }
            });
            if (!guildData) {
                await this.client.database.models.guilds.create({
                        guildID: guilds[i]
                    },
                    {
                        fields: ["guildID"]
                    });
                console.log(`${chalk.magenta("[GuildData]:")} ${chalk.green("Added")} ${chalk.yellow(guilds[i])}`);
            }
        }
    };
};