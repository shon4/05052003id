const moment = require('moment');
const Discord = require('discord.js')
exports.execute = async(client, message, args) => {
 if(!args[1]){
   let help = new Discord.RichEmbed()
   .setAuthor("❕ Server Commands")
   .setColor("GREEN")
   .addField("❗ | Server Info","type **!m.server info** to see the info of this server!")
   .addField("🔨 | Server Roles","type **!m.server roles** to see the roles list!")
   message.channel.send(help)
 }
  
  if(args[1] == 'info'){
  const gemj = (":earth_asia:");    
  moment.utc(message.guild.createdAt). format('dddd, MMMM Do YYYY, HH:mm:ss')
  let sicon = message.guild.iconURL;
  const verificationLevels = ['**None** (Unrestricted)', '**Low** (Must have a verified email on their Discord account.)', '**Medium** (Must also be registered on Discord for longer than 5 Minutes.)', '**Hard** (Must also be a member of this server for longer than 10 Minutes.)', '**Very Hard** (Must have a verified phone on their Discord accounts.)'];
  let region = {
            "singapore": ":flag_sg: Singapore",
            "sydney": ":flag_au: Sydney",
            "hongkong": ":flag_hk: Hongkong",
            "japan": ":flag_jp: Japan",
            "brazil": ":flag_br: Brazil",
            "russia": ":flag_ru: Russian",
            "eu-central": ":flag_eu: Central Europe",
            "eu-west": ":flag_eu: Western Europe",
            "us-central": ":flag_us: U.S. Central",
            "us-east": ":flag_us: U.S. East",
            "us-south": ":flag_us: U.S. South",
            "us-west": ":flag_us: U.S. West",
            "london": ":flag_gb:London"
         }
  let unique = message.guild.members.filter(m => m.presence.status !== 'offline' && m.presence.status !== 'online').size.toLocaleString()
         let onlinem = message.guild.members.filter(m => m.presence.status === 'online').size.toLocaleString()
         let idlem = message.guild.members.filter(m => m.presence.status === 'idle').size;
         let disturbm = message.guild.members.filter(m => m.presence.status === 'dnd').size;
         let offlinem = message.guild.members.filter(m => m.presence.status === 'offline').size.toLocaleString()
  const Mon = client.emojis.find("name","Gon"),
        Moff = client.emojis.find("name","Goff"),
        Mdnd = client.emojis.find("name","Gdnd"),
        Midle = client.emojis.find("name","Gidle")
  const serverstats = new Discord.RichEmbed()
    .setAuthor( message.guild.name , sicon)
    .setThumbnail(sicon)
    .setDescription("Guilds ID: " + message.guild.id)
    .addField(":crown: | Guilds Owner " , "• " + message.guild.owner + " (" + message.guild.ownerID + ")") 
    .setColor("RANDOM")
    .addField(`${gemj} | Guilds Region`,  `• ${region[message.guild.region]}`)
            .addField(` 👥 | Member Count  [${message.guild.memberCount}]`, ` • ${Mon} ${unique} Online\n• ${Midle} ${idlem} Idle/Away\n• ${Mdnd} ${disturbm} Do Not Disturb\n• ${Moff} ${offlinem} Invisible/Offline`)
  //.addField(":busts_in_silhouette:  | Member", "• " + message.guild.memberCount + " Users!")
    .addField(":satellite: | Total Channels", "• " + message.guild.channels.size + " Channels!\n" + `• ${message.guild.channels.filter(channel => channel.type === 'voice').size} Voice Channels!\n`+`• ${message.guild.channels.filter(channel => channel.type === 'text').size} Text Channels!`)  
    .addField(":hammer: | Total Roles", "• " + message.guild.roles.size + " Roles")//\n• for more info **(p)serverinfo roles**")
    .addField(":pencil: | Created At", "• " + moment.utc(message.guild.createdAt). format('dddd, MMMM Do YYYY, HH:mm:ss')) 
    .addField(":white_check_mark: | Verification Level", "• " + ` ${verificationLevels[message.guild.verificationLevel]}`)
    .setFooter(`For : ${message.author.tag}`)
    .setTimestamp()
    return message.channel.send(serverstats) 
  
  }
  if(args[1] == 'roles'){
    const WxArtzEmbedBiarSyantik = require('discord.js').RichEmbed;
	let number = message.guild.roles.array().map((roles,i) => `\`${i+1}\` - ${roles.toString()}`)
	number = client.util.chunk(number, 10);
	let index = 0;
  const ge = new WxArtzEmbedBiarSyantik()
  .setAuthor(`🛠 | Roles List [${message.guild.roles.size}]`)
  .setDescription(number[index].join('\n'))
  .setFooter(`Page ${index+1} of ${number.length}`)
	const m = await message.channel.send(ge);
	await m.react('⬅');
  await m.react('🔴');
	await m.react('➡');
  
	async function awaitReaction(){
    const filter =(rect, usr) => ['⬅', '🔴','➡'].includes(rect.emoji.name) && usr.id === message.author.id
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
		index = ((index % number.length) + number.length) % number.length;
		ge.setDescription(number[index].join('\n'))
    ge.setFooter(`Page ${index+1} of ${number.length}`)
		await m.edit(ge);
		return awaitReaction();
	}
	return awaitReaction();

  }
};

exports.info = {
    name: "server",
    alias: [],
    permission: "default",
    type: "general",
  usage: "(p)server [info/roles]",
    guildOnly: false,
	help: "show to info of this server"
};