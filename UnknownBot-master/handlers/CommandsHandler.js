const { readdir } = require('fs'),
    { resolve } = require('path'),
    chalk = require('chalk');

module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async load() {
        readdir('./commands/', (err, content) => {
            if (err) return client.log.err(err);
            if (!content) return;
            let groups = [];
            for (let element of content){
                if (!element.includes('.')) groups.push(element);
            }
            for (const folder of groups){
                readdir('./commands/' + folder, (e, files) => {
                    if (e) return client.log.err(e);
                    let commandFile = files.filter(f => f.split(".").pop() === "js");
                    if (commandFile.length < 1) return;
                    for (const element of commandFile) {
                        const props = require(resolve('./commands/' + folder + '/' + element));
                        const cmd = new props(this);
                        console.log(`${chalk.green('[LOAD]' + ' ' + element.split('.')[0])} ${chalk.blue('OF')} ${chalk.yellow(folder)} ${chalk.blue('MODULE')}`)
                        this.client.commands.set(cmd.help.name, cmd);
                        if (cmd.config.aliases.length !== 0) {
                            for (let alias of cmd.config.aliases) {
                                this.client.aliases.set(alias, cmd.help.name);
                            }
                        }
                    }
                });
            }
        });
    };
};