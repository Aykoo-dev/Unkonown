const {ShardingManager} = require('discord.js'),
    chalk = require('chalk'),
    { token } = require('./settings');

console.log(chalk.yellow('Starting...'));

const Manager = new ShardingManager('./unk.js', {
    autoSpawn: true,
    token: token
});

Manager.spawn().catch((e) => console.log(chalk.red('Shard Error. DETAILS : ' + e)))
