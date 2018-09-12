const moment = require('moment'),
      { RichEmbed } = require('discord.js')

require('moment-duration-format');
exports.execute= async(client,msg,args) => {
  args = args.slice(1)
 /* const member = msg.mentions.members.first() || msg.guild.members.get(args[1]) || msg.member;
 
  const userprof = client.userprof.get(member.user.id)
 userprof.credit = (userprof.credit + 200)
const OneDay = 8.46e+7;
const now = Date.now()
const estimatedTime = (userprof.time.lastDaily + OneDay) - now;
if(userprof.time.lastDaily && estimatedTime > 0) return msg.channel.send(`wait ${moment.duration(estimatedTime).format('h [hours] m [minutes] s [seconds]')}`);
  client.userprof.set(member.user.id, userprof) 
  userprof.time.lastDaily = now
  return msg.channel.send(`<@${member.user.id}> ` +"you claimed your \`200\` daily credit")
  */
  let authorprof = client.userprof.get(msg.author.id) //|| require('../../assets/json/userprof.json');
	const now = Date.now();
	const estimatedTime = (authorprof.time.lastDaily + 8.46e+7) - now;
	if(estimatedTime > 0 && authorprof.time.lastDaily) return msg.channel.send(`​ :up: | **${msg.author.username}, you can get daily rewards again in \`${moment.duration(estimatedTime).format('d [days] h [hours] m [minutes] s [seconds]')}\`**`);
	//if(!args[0]) return msg.channel.send(':up: **| You can give reputation point!**');
	let user = msg.mentions.users.first() || client.users.get(args[0]) || msg.member
	if(!user) return msg.channel.send('❗**| No user found**');
	//if(user.id === msg.author.id) return msg.channel.send('❗**| You can\'t give reputation to yourselft**');
	if(user.bot) return msg.channel.send('🤖**| Bot doesn\'t have profile**');
	let userprof = client.userprof.get(user.id) //|| require('../../assets/json/userprof.json');
	try{
		userprof.time.lastDaily = now;
		userprof.credit+=200;
		client.userprof.set(user.id, authorprof);
		client.userprof.set(user.id, userprof);
		return msg.channel.send(`​** :up: | Hey** ${user.toString()}** you get \`200\` from daily rewards**`);
	} catch(e){
		const embed = new RichEmbed()
		.setColor('RED')
		.setTitle('🚫 An Error Occured')
		.setDescription(client.util.codeblock(e.stack));
		return msg.channel.send(embed);
	}
}
 //@AndroidBecomeHuman
//itu didalam execute ya lord :v
exports.info = {
  name:"daily",
  alias:[],
  type:"beta",
  permission:"default",
  guildOnly:true,
  usage:"(p)daily",
  help:"claim your daily rewards every 24 hours"
  
}