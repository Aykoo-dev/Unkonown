module.exports.Command = class Command {
    constructor(client, {
        name,
        aliases,
        examples,
        description,
        cooldown,
        owner
    }) {
        this.client = client;
        this.config = {
            cooldown: cooldown,
            owner: owner,
            aliases: aliases,
            examples: examples,
        };
        this.help = {
            name: name,
            description: description
        };
    }
}