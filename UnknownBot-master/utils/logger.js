const chalk = require("chalk");

class Logger {
    constructor(options) {
        this.options = options;
    }

    /**
     * @returns {void}
     * @param {...string} argv
     */
    warn(...argv) {
        console.log(chalk.yellow("[WARNING]"));
        console.warn(...argv);
        console.log(chalk.yellow("[/WARNING]"));
    }

    /**
     * @returns {void}
     * @param {...string} argv
     */
    error(...argv) {
        console.log(chalk.red("[ERROR]"));
        console.log(...argv);
        console.trace();
        console.log(chalk.red("[/ERROR]"));
    }

    /**
     * @returns {void}
     * @param {...string} argv
     */
    fatal(...argv) {
        console.log(chalk.red("[FATAL]"));
        console.log(...argv);
        console.log(chalk.red("[/FATAL]"));
    }

    /**
     * @returns {void}
     * @param {...string} argv
     */
    info(...argv) {
        console.log(chalk.cyan("[UNKNOWN]    ") + chalk.yellow(...argv));
    };
}

module.exports.Logger = Logger;