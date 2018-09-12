const Discord = require("discord.js");
const cfg = require('../config.js');
const moment = require('moment')
const client = new Discord.Client()
const RichEmbed = require('discord.js').RichEmbed
const { Canvas } = require('canvas-constructor')
var vc = client.voiceConnections
exports.execute = async (client, msg, args ) => {
 // args = args.slice(1)
  const us = Date.now();
//  if(args.length < 1) return msg.channel.send("I need some code to eval!")
	let code = '\`\`\`js\n'+ args.slice(1).join(' ') +'\`\`\`';
  if(args.slice(1).length < 1) return msg.channel.send("Please insert some Code to Eval!")
	if(args.length > 1024) code = await client.util.hastebin(args.slice(1).join(' '));
  const emb = new RichEmbed()
  .setColor('#81FF00')
  .addField('📥 INPUT', code);
  
  try {
      const code = args.slice(1).join(' ');
      let evaled = eval(code)

      if (typeof evaled !== 'string')
        evaled = require('util').inspect(evaled);
      let output = this.clean(evaled);
      output.replace(new RegExp(client.token, 'g'), 'Uvwuvwevwevwe Onyetevwevwe Ugbwemugbwem Osas')
      if(output.length > 1024){
        const body = await client.util.hastebin(output);
        emb.addField('📤 OUTPUT', body);
      }else{
        emb.addField('📤 OUTPUT', '`\`\`\n'+ output.replace(new RegExp(client.token, 'g'), 'Uvwuvwevwevwe Onyetevwevwe Ugbwemugbwem Osas')
 +'\`\`\`');
      }

      msg.channel.send(emb);
    } catch (err) {
      let error = this.clean(err);
      emb.setColor('#8F1000');
      if(error.length > 1024){
        const body = await client.util.hastebin(error);
        emb.addField('❌ERROR', body);
      }else{
      emb.addField('❌ERROR', '\`\`\`\n'+ error +'\`\`\`');
      }
      msg.channel.send(emb.setFooter(`​⏱️${Date.now() - us}ms`));
    }
}
exports.clean = (text) => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

/*
const { post } = require('node-superfetch');
async function hastebin(text){
	const { body } = await post('https://www.hastebin.com/documents').send(text);
	return `https://www.hastebin.com/${body.key}.js`
}
*/
exports.info = {
    name: "eval",
    alias: ["ev"],
    permission: "admin",
    type: "admin",
    guildOnly: false,
  usage: "(p)eval [code]",
    help: "I CANT DO ANYTHING"
};