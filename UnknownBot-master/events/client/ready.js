const chalk = require('chalk');
module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async exec () {
        await this.client.monitors.exec('guildData', this.client);
        await this.client.user.setActivity({
           name: this.client.config.status.name,
           type: this.client.config.status.type
        });
        console.log(chalk.yellow('Shard ' + (this.client.shard.ids) + ' ready. ' + this.client.users.cache.size + ' User.'));

        const activities = [
            "Δ Unknown | ,help",
            `Δ Unknown | ${this.client.guilds.cache.size} serveurs`,
            `Δ Unknown# | ${this.client.users.cache.size} users`,
            "sora.wtf/invite",
        ];
        this.client.setInterval(() => {
            const index = Math.floor(Math.random() * activities.length);
            this.client.user.setActivity(activities[index], {
                type: "PLAYING",
            });
        }, 15000);
    }
};