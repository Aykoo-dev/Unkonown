const {Command} = require('../../structures/Command');

module.exports = class evalCommand extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            aliases: ["ev"],
            examples: [],
            description: ".",
            cooldown: 5,
            owner: true,
            args: false
        });
    }

    async exec(message, argv) {
        const clean = text => {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`js" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }
        try {

            const code = argv.join(" ");
            if (!code) return message.channel.send('Veuillez donner le code a evaluer.')
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            await message.channel.send(clean(evaled), {code: "xl"});
        } catch (err) {
            await message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
};
