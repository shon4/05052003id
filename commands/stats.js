const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client()
const cfg = require('../config.js')

//let Discord = require ('discord.js')


exports.execute = async(client, message, args) => {
  
  if(!args[1]){
    var usage = client.emojis.find("name","Msystem")
  var help = new Discord.RichEmbed()
  .setAuthor("❕ Stats Commands")
  .addField(`${usage} | System Status`,"type **!m.stats -s** to get the system status!")
  .addField("🌐 | Guild Status","type **!m.stats -g** to see the guild list!")
  .setColor("RANDOM")
  message.channel.send(help)
  }
  
 if (args[1] == '-s') {
//Code here 

    const cpu = process.cpuUsage().system / 1024 / 1024;
const used = process.memoryUsage().heapUsed / 1024 / 1024;
  let avt = message.author.displayAvatarURL;
  let uptimes = (Math.round(client.uptime / (1000 * 60 * 60))) + " hrs, " + (Math.round(client.uptime / (1000 * 60)) % 60) + " mins, and " + (Math.round(client.uptime / 1000) % 60) + " secs.\n"
  const gemj2 = (":earth_asia:"); 
  const upt = (":hourglass:");
  var usage = client.emojis.find("name","Msystem");
  const musg = (":floppy_disk:");
  const lib = (":bookmark:");
  const node = require('../package.json').engines
  const cnl = client.emojis.find("name","Gchannel");
  const usr = client.emojis.find("name","Guser");
  const sembedStats = new Discord.RichEmbed()
    .setAuthor("Bot Status", avt)
    .setDescription(`Hello i'm Miyamizu Mitsuha \nMy default Prefix is `+ "` " +`${cfg.config.PREFIX}` + "`\nFound an bugs? type \`!m.bugreport [bug]\`")
    .setThumbnail(client.user.displayAvatarURL)
    .addBlankField(true)
    .setColor("RANDOM")
    .addField(`${gemj2} | Global Status`, `• ${client.guilds.size} Servers! \n` +  `• ${client.channels.size} Channels!\n` + `• ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Users!\n` + `• ${client.commands.length} Commands!`)
    .addField(` ${lib} | Library`, `• Discord.js ${Discord.version}\n` +`• Nodejs 8.11.4`)
    .addField(`${usage} | System Status`, `• CPU Usage \`${Math.round(cpu * 100) / 100}% \`\n` +`• Memory Usage \`${Math.round(used * 100) /100}MB \`\n` + `• Uptime \`${uptimes}` +"`")
  //  .addField(`${musg}| Usage`, `• ${Math.round(used * 100) / 100} MB`)
    //.addField(`${upt} | Uptime`, "• " + uptimes)
    .addField(":crown: | Owner", "• WXArtz#4456",true)
    .addField(":white_check_mark: Featured Links", "[Invite Me!](https://discordapp.com/oauth2/authorize?client_id=466042707366772759&scope=bot&permissions=372763718) | [Support Me!](https://paypal.me/wxartz/) | [Vote me!](https://discordbots.org/bot/466042707366772759/vote/)")
    .setFooter(`For : ${message.author.tag}`)
    .setTimestamp()
   message.channel.send(sembedStats)
    
 }

  if(args[1] === '-g') {
//Code here 
    //message.channel.send("it's working!")
const WxArtzEmbedBiarSyantik = require('discord.js').RichEmbed;

	let number = client.guilds.array().sort().map((x,i) => `\`${i+1}\` - ${x.name}`)//.join('\n')
	number = client.util.chunk(number, 10);
// let shuffle = client.guilds.array().map((x,i) => `\`${i+1}\` - ${x.name}`)
let  shuffle = client.util.shuffle(number)
	let index = 0;
  const ge = new WxArtzEmbedBiarSyantik()
  .setColor("RANDOM")
  .setAuthor(`🌍 | Guild List [${client.guilds.size}]`, message.author.displayAvatarURL)
  .setDescription(number[index].join('\n'))
  .setFooter(`Page ${index+1} of ${number.length}`)
	const m = await message.channel.send(ge);
	await m.react('⬅');
  await m.react('🔴');
	await m.react('➡');
  //await m.react('🔁')
	async function awaitReaction(){
    const filter =(rect, usr) => ['⬅', '🔴','➡' ].includes(rect.emoji.name) && usr.id === message.author.id
		const response = await m.awaitReactions(filter, {
			max: 1,
			time: 30000
		});
		if(!response.size){
			return undefined;
		}
		const emoji = response.first().emoji.name;
		if(emoji === '⬅') index--;
    if(emoji === '🔴')  m.delete();
		if(emoji === '➡') index++;
    //if(emoji === '🔁') await m.channel.send('Currently Need Some Fixed').then(m=>m.delete(5000))//m.edit(ge.setDescription(shuffle.number[index].join('\n')))//shuffle[index].join('\n')
		index = ((index % number.length) + number.length) % number.length;
		ge.setDescription(number[index].join('\n'))
    ge.setFooter(`Page ${index+1} of ${number.length}`)
		await m.edit(ge);
		return awaitReaction();
	}
	return awaitReaction();

}
}
exports.info = {
    name: "stats",
    alias: ["status", "info"],
    permission: "default",
    type: "general",
  usage: "(p)stats",
    guildOnly: false,
	help: "Print bot stats."
};
