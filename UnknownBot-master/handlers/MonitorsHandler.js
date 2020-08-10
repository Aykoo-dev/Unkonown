module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async exec (event, ...argv) {
        let monitorClass = require('../monitors/' + event)
        await new monitorClass(this.client, ...argv).exec();
    };
};