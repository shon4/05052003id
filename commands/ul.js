const WxArtzEmbedBiarSyantik = require('discord.js').RichEmbed;
exports.execute = async(client, msg, args) => {
	let number = client.users.array().map((e,i)=> `\`${i+1}\` - ${e.username}`)
	number = client.util.chunk(number, 10);
	let index = 0;
  const ge = new WxArtzEmbedBiarSyantik()
  .setAuthor(`🌍 Global Users List [${client.users.size}]`)
  .setDescription(number[index].join('\n'))
  .setFooter(`Page ${index+1} of ${number.length}`)
	const m = await msg.channel.send(ge);
  await m.react('⏪')
	await m.react('⬅');
  await m.react('🔴');
	await m.react('➡');
  await m.react('⏩')
	async function awaitReaction(){
    const filter =(rect, usr) => ['⬅', '🔴','➡','⏪','⏩'].includes(rect.emoji.name) && usr.id === msg.author.id
		const response = await m.awaitReactions(filter, {
			max: 1,
			time: 60000
		});
		if(!response.size){
			return undefined;
		}
		const emoji = response.first().emoji.name;
		if(emoji === '⬅') index--;
    if(emoji === '⏪') index-=10;
    if(emoji === '🔴')  m.delete();
		if(emoji === '➡') index++;
    if(emoji === '⏩') index+=10;
		index = ((index % number.length) + number.length) % number.length;
		ge.setDescription(number[index].join('\n'))
    ge.setFooter(`Page ${index+1} of ${number.length}`)
		await m.edit(ge);
		return awaitReaction();
	}
	return awaitReaction();
}

exports.info = {
    name: "userlist",
    alias: ["ul"],
    permission: "test",
    type: "beta",
    guildOnly: false,
    usage: "(p)",
    help: "new cmd"
};