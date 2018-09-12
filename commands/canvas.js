const { Canvas } = require('canvas-constructor');
const { RichEmbed } = require('discord.js');
const { get } = require("superagent")
const { resolve, join } = require("path");
exports.execute = async (client, msg, args) => {
  if(msg.author.id !== client.config.OWNER_ID)return
  var {body:fortnite} = await get("https://imgdb.net/images/4006.jpg")
  var {body:profile} = await get("https://imgdb.net/images/4087.png")
  var {body:bg} = await get("https://imgdb.net/images/4052.jpg")
  var {body:bg2} = await get("https://imgdb.net/images/4036.jpg")
  var { body:dsl} = await get("https://imgdb.net/images/4082.png")
    const ping = Date.now();
  
    const regex = /https?:\/\/.+\.(?:png|jpg|jpeg)/gi;
    if(args.length < 1) return msg.reply('No code Provided');
    const embed = new RichEmbed();
    let input = `\`\`\`Canvas\n${args.slice(1).join(' ')}\`\`\``;
    if(input.length > 1204) input = await client.util.hastebin(args.join(' '));
    embed.addField('📥 INPUT', input);
    try{
        const avatar = (await get(msg.author.avatarURL || client.user.avatarURL)).body;
        let code = args.slice(1).join(' ');
        if(!code.startsWith('new Canvas')) throw new Error('the command cannot execute without new Canvas(high, width)');
        if(!code.includes('.toBufferAsync()')) code += '.toBufferAsync()';
        code.replace(/;/g, '');
        code.replace(new RegExp(`${client.token}`, 'g'), "{ Object }");
        code.replace(regex, async (con)=> {
            const { body } = await get(con);
            return body;
        });
        const evaled = await eval(code);
        embed.setColor('#00FF12');
        embed.addField('📤 OUTPUT', '\u200B');
        embed.attachFile({attachment: evaled, name: 'canvas.png'});
    embed.setImage('attachment://canvas.png');
        embed.setFooter(`⏱️ ${Date.now() - ping}ms`);
        return msg.channel.send(embed);
    }catch(e){
        let err = `\`\`\`ini\n${e.message}\`\`\``;
        if(err.length > 1204) err = await client.util.hastebin(e.message);
        embed.setColor('#FF1200');
        embed.addField('⛔ ERROR', err);
        embed.setFooter(`⏱️ ${Date.now() - ping}ms`);
        return msg.channel.send(embed);
    }

};

exports.info = {
    name: "canvas",
    alias: ["cv"],
    permission: "admin",
    type: "hidden",
  usage: "(p)canvas [code]",
    guildOnly: true,
    help: "new cmd"
};