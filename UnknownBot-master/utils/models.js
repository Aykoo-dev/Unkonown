module.exports = async (Sequelize, database) => {

    database.define('guilds', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        guildID: {
            type: Sequelize.STRING(22),
            allowNull: false
        },
        prefix: {
            type: Sequelize.STRING,
            defaultValue: ','
        },
        welcomeChannel: {
            type: Sequelize.STRING,
            allowNull: true
        },
        welcomeMessage: {
            type: Sequelize.TEXT,
            defaultValue: 'Welcome %user% !'
        },
        goodbyeChannel: {
            type: Sequelize.STRING,
            allowNull: true
        },
        goodbyeMessage: {
            type: Sequelize.TEXT,
            defaultValue: 'Goodbye %user% !'
        }
    });

    await database.sync();
    return database.models;
};
