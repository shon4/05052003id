//require('dotenv').coonnfig()
const DEFAULTPREFIX = "!m.";
const { get } = require('superagent')
const Discord = require('discord.js');
const fs = require('fs');
const cfg = require('./config.js');
const express = require('express');
const app = express();
const http = require('http');
const config = require('./config.js');
let xp = require("./xp.json");
let cooldown = new Set();
let cdseconds = 5;
const superagent = require('superagent')
const { Canvas } = require('canvas-constructor')
const linter = new (require('eslint').Linter)();
const { RichEmbed } = require('discord.js');
const bmsg = require('./assets/nodetect-js.json');
const no = require('./assets/nodetect-js.json');
const util = require('./Util.js')

///////////////////////////////////////////////////////////////////////////////

var assets = require('./assets');
app.use(express.static('public'));
app.use("/assets", assets);
const client = new Discord.Client();

// get config values.
client.config = {
    TOKEN: process.env.BOT_TOKEN,
    TRN_APIKEY: process.env.TRN_APIKEY,
    YOUTUBE_APIKEY: process.env.YOUTUBE_APIKEY,
    OWNER_ID: cfg.config.OWNER_ID,
    PREFIX: cfg.config.PREFIX,
};
client.util =  require('./Util.js')
client.queue = new Discord.Collection();

// let other files access config
exports.config = () => {
    return client.config;
}
exports.util = () =>{
  return client.util
}
// let other files access commands
exports.commands = () => {
    return client.commands;
}

// add all commands
client.commands = [];
fs.readdir("./commands/", function(err, files){
    files.forEach(f => {
        const cmd = require(`./commands/${f}`);
        client.commands.push(cmd);
    });
});
//process.on('unhandledRejection', error => {
    //console.log(`Unhandled Error Found! \n ${error.stack}`)

/*process.on( 'uncaughtException', ( ex ) =>
	{
		console.log( ex.stack )
		client.channels.get('484592384592707595').send( `uncaughtException : ${ex.stack}` )
	})

process.on( 'unhandledRejection', ( reason, p ) =>
	{
		const err = `${p}\n${reason.stack}`
		console.log( err )
		client.channels.get('484592384592707595').send( `unhandledRejection : ${err}` )
	})*/
client.on('error', error => {
client.channels.get('484592384592707595').send(`\`\`\`${error.message}\`\`\``)
}) 
///////////////////////////////////////////////////////////////////////////////
app.get("/", (request, response) => {
  console.log(Date.now() + " Pinging Done");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var moment = require('moment')

client.on("guildCreate", guild => {
  console.log(`${client.user.tag} Has Been Invited To ${guild.name}!`)
});

client.on("guildCreate", guild => {
  
    var guildjoinembed = new Discord.RichEmbed()
    .setAuthor("📥 | Im Just Joined To The New Guild!")
    .setDescription(`• Name: **${guild.name}**\n• ID: **${guild.id}**\n• Member: **${guild.memberCount}**\n• Owner: **${guild.owner.user.tag}**`)
    .setThumbnail(guild.iconURL)
    .setColor('#00FF00');
    client.channels.get("484586229958967297").send(guildjoinembed)
});

client.on("guildDelete", guild => {
  console.log(`${client.user.tag} Has Been Kicked From ${guild.name}, RIP.`)
});

client.on("guildDelete", guild => {
  
    var guildleftembed = new Discord.RichEmbed()
    .setAuthor("📤 | Im Just Kicked From The Guild.")
    .setDescription(`• Name: **${guild.name}**\n• ID: **${guild.id}**\n• Member: **${guild.memberCount}**\n• Owner: **${guild.owner.user.tag}**`)
    .setThumbnail(guild.iconURL)
    .setColor('#FF0000');
    client.channels.get("484586229958967297").send(guildleftembed)
});



client.on("ready", () => {
    console.log("+-------[ON]-------+");
    console.log(`| Commands: ${client.commands.length} |`);
    console.log(`| Guilds:   ${client.guilds.array().length}  |`);
    console.log(`| Channels: ${client.channels.array().length} |`);
    console.log("+-------[ON]-------+");
    client.channels.get("484586229958967297").send(`i'm ${client.user.username} is ready for job!`)
    function setActivity() {
    var Gameinfo = ['see latest update !m.changelog','http://mitsuha-bot.esy.es/',`${cfg.config.PREFIX}help | ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Users!`, `Mitsuha V1.0.1`]

    var info = Gameinfo[Math.floor(Math.random() * Gameinfo.length)] 
    
    var typ = ["WATCHING " ,"STREAMING"]
    var tyy = typ[Math.floor(Math.random() * typ.length)]
    client.user.setActivity(info, {
      type: "STREAMING",
     url: "https://twitch.tv/jsm_wxartz/"
    })
    

    }

setInterval(setActivity, 5 * 10000)
});

client.on("guildMemberAdd", async (member, client, message, args, level) => {  
            var membern = member.user.username
            var hasiln = membern.length > 8 ? membern.substring(0, 10) + "..." : membern;
            async function createCanvas() {
            var imageUrlRegex = /\?size=2048$/g;

            var {body: background} = await superagent.get('https://imgdb.net/images/3967.jpg');
            var {body: avatar} = await get(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));


            return new Canvas(400,180)
     .addImage(background,0,0,400,180)
               .setColor("#7289DA")
      .setColor("#2C2F33")
 .addRect(160, 32, 244, 35)
  .addRect(224, 108, 176, 46)
  .setShadowColor("rgba(22, 22, 22, 1)") 
  .setShadowOffsetY(5) 
  .setShadowBlur(10) 
  .save() 
  .addCircle(84, 90, 62)
  .restore()
 .addRoundImage(avatar, 20, 26, 128, 128, 64)
              .restore()
  .createBeveledClip(20, 138, 128, 32, 5)
              .setColor("#2C2F33")
 .addRect(20, 138, 128, 32)
 .restore()
      .setTextAlign("center")
  .setTextFont(" 10pt Arial")
  .setColor("#FFFFFF")
  .addText(`Welcome To ${member.guild.name} `, 283, 54)
  .addText(`${hasiln}#${member.user.discriminator}`, 84, 159)
               .setTextAlign("left")
              .setTextFont("12pt Arial")
  .addText(`Member Count: ${member.guild.memberCount} `, 239, 137)
              .toBufferAsync();
            }
  var welcome = JSON.parse(fs.readFileSync("./welcomechannel.json", "utf8"))
 let welcomesetting = JSON.parse(fs.readFileSync("./welcomestatus.json", "utf8"));
    if (!welcomesetting[member.guild.id]) {
    welcomesetting[member.guild.id] = {
     values: 1
      }
    }
    if(!welcome[member.guild.id]) return;  
    let values = welcomesetting[member.guild.id].checker
  
    if (values === undefined) return;
    if (values === 0) return;
    if (values === 1) {
    var welcome = JSON.parse(fs.readFileSync("./welcomechannel.json", "utf8"))
    if (!welcome) return;
    let channel = member.guild.channels.get(`${welcome[member.guild.id].nick}`);
    if (!channel) return;
    let embed = new Discord.RichEmbed()
    .setAuthor(`Welcome to ${member.guild.name}`, member.guild.iconURL)
    .setDescription(`${member.user.tag} Hope You Enjoy Joining this Server!`)
    .setFooter(`• Currently Member is `+`"`+`${member.guild.memberCount}`+`"`)
    .setTimestamp()
       channel.send(embed)+channel.send(new Discord.Attachment(await createCanvas()));
    };
});

client.on("guildMemberRemove", async (member, client, message, args, level) => {  
            var membern = member.user.username
            var hasiln = membern.length > 8 ? membern.substring(0, 10) + "..." : membern;
            async function createCanvas() {
            var imageUrlRegex = /\?size=2048$/g;
              
            var {body: background} = await superagent.get('https://imgdb.net/images/3967.jpg');
            var {body: avatar} = await superagent.get(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));

            return new Canvas(400,180)
      .setColor("#7289DA")
      .setColor("#2C2F33")
              .addImage(background,0,0,400,180)
.addRect(160, 32, 244, 35)
  .addRect(224, 108, 176, 46)
  .setShadowColor("rgba(22, 22, 22, 1)") 
  .setShadowOffsetY(5) 
  .setShadowBlur(10) 
  .save() 
  .addCircle(84, 90, 62)
  .restore()
 .addRoundImage(avatar, 20, 26, 128, 128, 64)
              .restore()
        .createBeveledClip(20, 138, 128, 32, 5)
  .setColor("#2C2F33")
  .addRect(20, 138, 128, 32)
  .restore()
      .setTextAlign("center")
  .setTextFont(" 10pt Arial")
  .setColor("#FFFFFF")
  .addText(`Leaving From ${member.guild.name} `, 283, 54)
  .addText(`${hasiln}#${member.user.discriminator}`, 84, 159)
               .setTextAlign("left")
              .setTextFont(" 12pt Arial")
  .addText(`Member Count: ${member.guild.memberCount} `, 239, 137)
              .toBufferAsync();
            }
  var welcome = JSON.parse(fs.readFileSync("./welcomechannel.json", "utf8"))
 let welcomesetting = JSON.parse(fs.readFileSync("./welcomestatus.json", "utf8"));
    if (!welcomesetting[member.guild.id]) {
    welcomesetting[member.guild.id] = {
     values: 1
      }
    }
    if(!welcome[member.guild.id]) return;  
    let values = welcomesetting[member.guild.id].checker
  
    if (values === undefined) return;
    if (values === 0) return;
    if (values === 1) {
    var welcome = JSON.parse(fs.readFileSync("./welcomechannel.json", "utf8"))
    if (!welcome) return;
    let channel = member.guild.channels.get(`${welcome[member.guild.id].nick}`);
    if (!channel) return;
    let embed = new Discord.RichEmbed()
    .setAuthor(`Leaving From ${member.guild.name}`, member.guild.iconURL)
    .setDescription(`${member.user.tag} Hope You Fine Leaving this Server!`)
     .setFooter(`• Currently Member is `+`"`+`${member.guild.memberCount}`+`"`)
    .setTimestamp()
       channel.send(embed)+channel.send(new Discord.Attachment(await createCanvas()));
    };
});
client.on("message", autoresponder => {
    if (autoresponder.author.client) return;
    if (autoresponder.channel.type === "dm") return;
  
    var PREFIXES = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if (!PREFIXES[autoresponder.guild.id]) {
        PREFIXES[autoresponder.guild.id] = {
            PREFIXES: DEFAULTPREFIX
        };
    }

    var PREFIX = PREFIXES[autoresponder.guild.id].PREFIXES;
     
    let msg = autoresponder.content.toLowerCase();
    let sender = autoresponder.author;
    if (autoresponder.content.startsWith(PREFIX)) return;

    if (autoresponder.content === `<@${client.user.id}>`) {
        return autoresponder.reply("**Prefix for this server is `"+PREFIX+"`!**") 
    }
    
    if (autoresponder.content === `<@!${client.user.id}>`) {
        return autoresponder.reply("**Prefix for this server is `"+PREFIX+"`!**") 
    }

});

const Enmap = require('enmap')
client.userprof = new Enmap({ name: 'use'})

client.on("message", msg => {
   if(msg.author.bot) return;
  if(msg.channel.type === "dm") {
  let embed = new Discord.RichEmbed()
    .setTimestamp()
    .setTitle("Direct Message To The Bot")
    .addField(`Sent By:`,`${msg.author.tag}`)
    .setColor("RANDOM")
    .setThumbnail(msg.author.displayAvatarURL)
    .addField(`Message: `,msg.content)
    .setFooter(`DM Bot Messages | DM Logs`)
   
   return client.users.get("262674412912771082").send(embed)
  }
      if((/```(js|javascript)(.|\s)+```/gi).test(msg.content)) return require('./type/code.js')(msg); 
  //economy
 
const baseValue = {
    xp: 0,
    level: 0,
  credit:0,
  rep:0,
  title:"Title not set",
  time:{
    lastDaily:0,
    lastRep:0,
    dailyStreak:0,
    nextDaily:0,
  },
  background: "https://imgdb.net/images/4036.jpg",
  bio: "User haven't set their info"
}

 let userprof = client.userprof.get(msg.author.id) || baseValue;
userprof.xp++;
//client.userprof.set(msg.author.id, userprof)
  const curLevel = Math.floor(0.1*Math.sqrt(userprof.xp))
if(curLevel > userprof.level){
//msg.reply('level up');
userprof.level = curLevel;
}
  //pantes //napa diubah ke basevalue lagi coba :v
client.userprof.set(msg.author.id, userprof);

  //function leveling (client,msg) {
     
  
  //leveling(client,msg)
// if(msg.author.id !== client.config.OWNER_ID)return //msg.channel.send("Sorry **`MAINTANCE MODE`** is __**ON**__, i can't response for right now!")
    // log all messages read (not saved)
    var u = msg.author.username;
    var c = msg.channel.name;
    if(c == undefined) c = "private";
    var m = msg.content;
//   client.channels.get('479295773058531346').send("```[" + c + "] " + u + ": " + m+"```");

   // let prefix = fs.readFileSync('./prefixes.json', 'utf8');
//  prefix = JSON.parse(prefix);
  //prefix = prefix[msg.guild.id];
  //if(!prefix) prefix = client.config.PREFIX;

   // if(!m.startsWith(prefix)) return;
  
  var PREFIXES = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if (!PREFIXES[msg.guild.id]) {
        PREFIXES[msg.guild.id] = {
            PREFIXES: DEFAULTPREFIX
        };
  }//sudah fix
  
  var PREFIX = PREFIXES[msg.guild.id].PREFIXES;
if(!m.startsWith(PREFIX)) return;
    var args = m.substring(PREFIX.length).split(" ");
    var cmdName = args[0].toLowerCase();
/*
  try {
   
    let commandFile = require(`./commands/${cmdName}.js`);
    commandFile.execute(client, msg, args, PREFIX);
   
  } catch (e) {
   
    console.log(e.message);
   
  } finally {
   
    console.log(`${msg.author.tag} Using Command: ${cmdName}`);
   
  }*/
 


  
  
    client.commands.forEach(command => {
        if(cmdName === command.info.name || command.info.alias.includes(cmdName)){
            // guild or private chat check
            if(command.info.guildOnly && msg.channel.type === 'dm'){
                msg.channel.send("This command unavailable in private chat ");
                return;
            }
       /*   let test = ["262674412912771082","427473949476126740","327586923252285440"]
         // test.forEach(async function(owner) 
    if(command.info.permission == "test"
       && !test.includes(msg.author.id)) {//!== client.config.OWNER_ID ){
    let tester = new Discord.RichEmbed()
    .setDescription("**This Command is** **__Unreleased__** **You can try it by joining** __**Beta Tester Program**__ (DM to WXArtz#4456 if you want to join!) ")
    msg.channel.send(tester)
      return
    }else{
   command.execute(client,msg,args,PREFIX)
       const logger = new Discord.RichEmbed()
          .setColor("RANDOM")
          .addField("Commands Logger",`${msg.author.tag} Using Commands __**${command.info.name}**__ at __**#${msg.channel.name}**__ in Server __**${msg.guild.name}**__`)
              client.channels.get('478499712979173386').send(logger);
                         
         
      return
    }
          */
            // admin chec
            if(command.info.permission == "admin"
                    && msg.author.id !== client.config.OWNER_ID ){
              let admin = new Discord.RichEmbed()
              .setColor("RED")
              .addField(":x: Algorithm Denied","Only My Creator Can Use This Commands!")
                msg.channel.send("***Please Wait... Checking Credentials!***").then(x=> x.delete(2500)).then(m=>m.channel.send(admin))
              return
            }else{
                command.execute(client, msg, args, PREFIX);
              //btw bisa benerin setprefix? // yg mana ? gw belom kasih code ke main 
          const logger = new Discord.RichEmbed()
          .setColor("RANDOM")
          .addField("Commands Logger",`${msg.author.tag} Using Commands __**${command.info.name}**__ at __**#${msg.channel.name}**__ in Server __**${msg.guild.name}**__`)
              client.channels.get('478499712979173386').send(logger);
                         }
          try {
} catch(e){
  client.channels.get('478499712979173386').send(e.message)
}
    
        }
    });
});
    
               //eslint



///////////////////////////////////////////////////////////////////////////////

client.login(client.config.TOKEN);
process.on('unhandledRejection', error => {
    console.log(`Unhandled Error Found! \n${error.stack}`)
});