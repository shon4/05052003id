const WxArtzEmbedBiarSyantik = require('discord.js').RichEmbed;
exports.execute = async(client, msg, args) => {
	let number = msg.guild.emojis.array().slice().map((e,i)=> `${i+1} - ${e.toString()}`)
	number = client.util.chunk(number, 10);
	let index = 0;
  const ge = new WxArtzEmbedBiarSyantik()
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
			time: 30000
		});
		if(!response.size){
			return undefined;
		}
		const emoji = response.first().emoji.name;
		if(emoji === '⬅') index--;
    if(emoji === '⏪') index-=5;
    if(emoji === '🔴')  m.delete();
		if(emoji === '➡') index++;
    if(emoji === '⏩') index+=5;
		index = ((index % number.length) + number.length) % number.length;
		ge.setDescription(number[index].join('\n'))
    ge.setFooter(`Page ${index+1} of ${number.length}`)
		await m.edit(ge);
		return awaitReaction();
	}
	return awaitReaction();
}

exports.info = {
    name: "emojilist",
    alias: ["emolist"],
    permission: "default",
    type: "general",
    guildOnly: false,
    usage: "(p)",
    help: "new cmd"
};