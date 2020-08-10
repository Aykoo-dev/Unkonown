(async () => {
    const {Client, Collection} = require('discord.js'),
        Sequelize = require('sequelize'),
        chalk = require('chalk'),
        unk = new Client({
            fetchAllMembers: true
        }),
        { commandsHandler, eventsHandler, monitorsHandler } = require('./handlers/Handlers');

    let init = async () => {
        unk.config = require('./settings');
        unk.commands = new Collection();
        unk.aliases = new Collection();
        unk.monitors = new monitorsHandler(unk);
        unk.logger = new (require('./utils/logger').Logger);
        unk.colors = require('./utils/colors.json');
        unk.database = new Sequelize(unk.config.databaseURI, {
            define: {
                charset: 'utf8',
                collate: 'utf8_general_ci',
                timestamps: true
            },
            logging: false
        });
        unk.database.authenticate().then(async () => {
            await require('./utils/models')(Sequelize, unk.database).then(async () => {
                console.log(`${chalk.magenta('[Data]   ')} ${chalk.green('Connected')}`);
                console.log(`${chalk.magenta('[Model]  ')} ${chalk.green('Verified')}`);
                await new eventsHandler(unk).load();
                await new commandsHandler(unk).load();

                unk.login(unk.config.token).catch(e => {
                    console.error(e.toString());
                    process.exit(1);
                });
            }).catch(err => {
                console.error(err);
            });
        }).catch(err => {
            console.error(err);
        });
    };

    await init();
})();