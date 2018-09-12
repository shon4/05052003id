exports.execute = async (client, message, args) =>{
   await message.channel.send("**Please Wait for Rebooting...**").then(k => k.delete(3000)).then(m => m.channel.send("**Rebooting Started...**").then(d => d.delete(3000)).then(ms => ms.channel.send("**Rebooting Succes...**")))//.then(d => client.destroy()).then(() => client.login(client.config.BOT_TOKEN))
               //}, 5000)
                                                                            
    process.exit(1);
 /* 
  .then(message => client.destroy())
  .then(() => client.login(client.config.BOT_TOKEN))
  }*/
}
exports.info = {
    name: "reboot",
    alias: [],
    permission: "admin",
    type: "admin",
  usage: "(p)reboot",
    guildOnly: false,
    help: "new cmd"
};