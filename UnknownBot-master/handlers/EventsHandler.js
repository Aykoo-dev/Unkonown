const { readdir } = require('fs'),
    { resolve } = require('path'),
    chalk = require('chalk'),
    { MessageEmbed } = require('discord.js');

module.exports = class {
  constructor(client) {
      this.client = client;
  }
  async load() {
      readdir("./events/", (err, content) => {
          if (err) return console.log(err);
          if (content.length < 1) return;
          let groups = [];
          for (let element of content){
              if (!element.includes('.')) groups.push(element);
          }
          for (const folder of groups) {
              readdir("./events/" + folder, (e, files) => {
                  if (e) return console.log(e);
                  let eventFile = files.filter(f => f.split(".").pop() === "js");
                  if (eventFile.length < 1) return;
                  if (e) console.log(e);
                  for (const element of eventFile) {
                      let props = require(resolve("./events/" + folder + "/" + element));
                      console.log(`${chalk.green('[LOAD]')} ${chalk.blue(element.split('.')[0])} ${chalk.yellow('EVENT')}`)
                      const event = new props(this.client, MessageEmbed);
                      const evtName = element.split('.')[0];
                      this.client.on(evtName, (...args) => event.exec(...args));
                      delete require.cache[props];
                  }
              });
          }
      });
  };
};