const {Command} = require('../../structures/Command');

module.exports = class verif extends Command {
    constructor(client) {
        super(client, {
            name: "verif",
            aliases: [],
            examples: [],
            description: ".",
            cooldown: 5,
            owner: true,
            args: false
        });
    }

    async exec(message) {
        return message.channel.send({
           embed: {
               color: 0x2f3136,
               description: "**Cliquez sur l'émoji [ <:valide:737011827078201454> ] pour accédez au reste du serveur !**"
           }
        });
    }
};
