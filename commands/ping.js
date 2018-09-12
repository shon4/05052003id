const Discord = require('discord.js')
exports.execute = (client, message, args) => {
  
/*message.channel.send("Pinging...").then(m => m.setInterval(() => m.delete(), 3000))
 
 // .then(m => m.setInterval(() => m.edit( {
		var lat_ms = (m.createdTimestamp - message.createdTimestamp)*/
  var api_ms = (Math.round(client.ping))
			//m.delete().then().catch(console.error);
  let start = Date.now(); message.channel.send('***Pinging...***').then(message => {
    message.delete(3000).then(m => m.channel.send(embed))
    let diff = (Date.now() - start).toLocaleString();
    let API = (client.ping).toFixed(2)
			const apip = (":desktop:")
			var embed = new Discord.RichEmbed()
			.setColor('RANDOM')
			.addField(":ping_pong: Pong!", "```" + diff + "ms```", true)
			.addField(`${apip} API`, "```" + api_ms + "ms```", true)
      .setTimestamp()
			.setFooter("Miyamizu Mitsuha")
			//message.channel.send("**Pinging...**").then(m => m.setInterval(() => m.edit(embed), 3000))
//message.channel.send(embed)
      })
                                                                  }
                                                                                                 

exports.info = {
    name: "ping",
    alias: [],
    permission: "default",
    type: "general",
  usage: "(p)ping",
    guildOnly: false,
    help: "Show Your Ping"
};