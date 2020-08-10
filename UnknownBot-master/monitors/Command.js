const chalk = require('chalk');

module.exports = class {
    constructor(client, message, argv, cmd, owner) {
        this.client = client;
        this.message = message;
        this.argv = argv;
        this.cmd = cmd;
        this.owner = owner;
    };

    async exec() {
        const data = await this.client.database.models.guilds.findOne({
           where: {
               guildID: this.message.guild.id
           }
        });
        console.log(chalk`{green [ SERVER    ]:} ${this.message.guild.name} / {cyan ${this.message.guild.id}}`);
        console.log(chalk`{green [ CHANNEL   ]:} ${this.message.channel.name} / {cyan ${this.message.channel.id}}`);
        console.log(chalk`{green [ USER      ]:} ${this.message.author.tag} / {cyan ${this.message.author.id}}`);
        console.log(chalk`{green [ COMMAND   ]:} ${this.message.prefix}${this.cmd.help.name} / {cyan ${this.cmd.help.name}}`);
        console.log(chalk`{green [ OWNER     ]:} {cyan ${this.owner}}`);
        console.log(chalk`{green [ ARGUMENTS ]:} ${this.argv.join(" ") || chalk`{yellow Aucun arguments}`}`);

        if (this.cmd.config.owner && !this.owner) return;
        await this.cmd.exec(this.message, this.argv, data);
    };
};