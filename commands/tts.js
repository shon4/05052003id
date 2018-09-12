const tts = require('google-tts-api');
const path = require('path');
const snekfetch = require('snekfetch');
module.exports.execute = async (client, message, args) => {  
//  let bug = args[0]
 // console.log(args[1])
  let tts1 = message.content.split(" ").slice(1).join(" ");
  if (!tts1) return message.channel.send('Please enter a text to tts!')
  if(tts.content == "kontol") return message.channel.send("Bba kka")
  const emoji = "🇸🇪"
const emoji1 = "🇬🇧"
const emoji2  = "🇫🇮"
const emoji3 = "🇪🇸"
const emoji4 = "🇮🇩"
message.channel.send('**Please choose a language with the reaction.** (If you want to add a language, please dm `WXArtz#4456` to suggest a language.)')
.then( msg => {

msg.react(emoji).then( r => {
msg.react(emoji1)
msg.react(emoji2)
msg.react(emoji3)
msg.react(emoji4)
  
  const sweden = (reaction, user) => reaction.emoji.name === emoji && user.id === message.author.id;
  const england = (reaction, user) => reaction.emoji.name === emoji1 && user.id === message.author.id;
  const finish = (reaction, user) => reaction.emoji.name === emoji2 && user.id === message.author.id;
  const spanien = (reaction, user) => reaction.emoji.name === emoji3 && user.id === message.author.id;
  const indonesia = (reaction, user) => reaction.emoji.name === emoji4 && user.id === message.author.id;
  
  const swe = msg.createReactionCollector(sweden, { time: 10000 });
  const eng = msg.createReactionCollector(england, { time: 10000 });
  const fin = msg.createReactionCollector(finish, { time: 10000 });
  const spa = msg.createReactionCollector(spanien, { time: 10000 });
  const id = msg.createReactionCollector(indonesia,{time:10000});
  

  swe.on('collect', r => {

            const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.channel.send('**Please be in a voice channel first!**');
        if (!client.voiceConnections.get(message.channel.guild.id)) {
        voiceChannel.join()
        .then(connnection => {
          tts(tts1, `sv`, 1)
          .then((url) => {
            const dispatcher = connnection.playStream(url);
            message.react('📢');
            dispatcher.on('end', () => voiceChannel.leave());
          })
          .catch((err) => {
            message.channel.send(':no_entry_sign: Something wen\'t wrong.\n' + err);
            voiceChannel.leave();
          });
        });
       } else {

       }
  })
  
  swe.on('end', r => {
        return;
        
         })
  eng.on('collect', r => {
              const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.channel.send('**Please be in a voice channel first!**');
        if (!client.voiceConnections.get(message.channel.guild.id)) {
        voiceChannel.join()
        .then(connnection => {
          tts(tts1, `en`, 1)
          .then((url) => {
            const dispatcher = connnection.playStream(url);
            message.react('📢');
            dispatcher.on('end', () => voiceChannel.leave());
          })
          .catch((err) => {
            message.channel.send(':no_entry_sign: Something wen\'t wrong.\n' + err);
            voiceChannel.leave();
          });
        });
       } else {

       }
  })
id.on('collect', r => {
              const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.channel.send('**Please be in a voice channel first!**');
        if (!client.voiceConnections.get(message.channel.guild.id)) {
        voiceChannel.join()
        .then(connnection => {
          tts(tts1, `id`, 1)
          .then((url) => {
            const dispatcher = connnection.playStream(url);
            message.react('📢');
            dispatcher.on('end', () => voiceChannel.leave());
          })
          .catch((err) => {
            message.channel.send(':no_entry_sign: Something wen\'t wrong.\n' + err);
            voiceChannel.leave();
          });
        });
       } else {

       }
  })
  
    fin.on('collect', r => {

            const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.channel.send('**Please be in a voice channel first!**');
        if (!client.voiceConnections.get(message.channel.guild.id)) {
        voiceChannel.join()
        .then(connnection => {
          tts(tts1, `fi`, 1)
          .then((url) => {
            const dispatcher = connnection.playStream(url);
            message.react('📢');
            dispatcher.on('end', () => voiceChannel.leave());
          })
          .catch((err) => {

            voiceChannel.leave();
          });
        });
       } else {
         message.channel.send(':no_entry_sign: Sorry but it seems like I\'m already playing something on this server.');
       }
  })
      spa.on('collect', r => {

            const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.channel.send('**Please be in a voice channel first!**');
        if (!client.voiceConnections.get(message.channel.guild.id)) {
        voiceChannel.join()
        .then(connnection => {
          tts(tts1, `es`, 1)
          .then((url) => {
            const dispatcher = connnection.playStream(url);
            message.react('📢');
            dispatcher.on('end', () => voiceChannel.leave());
          })
          .catch((err) => {
            message.channel.send(':no_entry_sign: Something wen\'t wrong.\n' + err);
            voiceChannel.leave();
          });
        });
       } else {

       }
  })
  
})
  

})
}
exports.info={
  name:"text-to-speech",
  alias:["tts"],
  usage:"(p)tts [text]",
  type:"hidden",
  permission:"admin",
  guildOnly:true,
  help:"text-to-speech powered by google translate",
}