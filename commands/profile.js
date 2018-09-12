const { Canvas } = require('canvas-constructor')
const Discord = require("discord.js")
const { get } = require('superagent'),
      xp = require('../xp.json'),
      Enmap = require ('enmap')
//client.userprof = new Enmap({ name: 'userprof'})
exports.execute = async(client,message,args) => {
 /* client = bot;
  message = msg;*/
  message.react("🖼")
//  client.userprof = new Enmap({ name: 'userprof'})
  const member = message.mentions.members.first() || message.guild.members.get(args[1]) || message.member;
 /* const baseValue = {
    xp: 0,
    level: 0
}
*/
//client.useprof.set(member.user.id, baseValue)
  if(!xp[member.user.id]){
   xp[member.user.id] = {
     xp: 0,
     level: 0
  };
}
  let rep = client.userprof.get(member.user.id).rep
  let curcredit = client.userprof.get(member.user.id).credit
  let curxp = client.userprof.get(member.user.id).xp//xp[member.user.id].xp;
  let curlvl = client.userprof.get(member.user.id).level;
  let nxtLvlXp = curlvl * 1000;
  let difference = nxtLvlXp - curxp;
  let bs  = client.userprof.get(member.user.id).background
  let userprof = client.userprof.get(member.user.id).bio.toString()
//userprof.bio = args.slice(1).join(' '),
//client.userprof.set(member.user.id, userprof);

  var {body:profile} = await get("https://imgdb.net/images/4087.png")
  var {body:bg} = await get("https://imgdb.net/images/4085.png")
  var {body:bg2} = await get("https://imgdb.net/images/4036.jpg")
  var { body:bgg} = await get(bs)
  if(member.user.bot) return await message.channel.send("Bot doesn't have profile")
  var avatar = (await get(member.user.displayAvatarURL || client.user.avatarURL)).body;
  async function createProfile() {
    return new Canvas(300,300)
    
.addImage(bgg,0,-50,300,400)
.addImage(profile,0,0,300,300)
//.addImage(dsl,100,110,25,25)
.addImage(avatar,20,68,73,73)
.setColor("#ffffff")
.setTextFont("bold 12px Courier New")
.addText(member.user.username,125,120)
.setTextFont("bold 10px Courier New")
.setColor("#FFD700")
.addText(member.user.id,125,131)
.setColor("#ffffff")
    .setTextAlign('center')
.setTextFont("bold 16px Courier New")
.addText(`+${rep}rep`,55,160)
  /*  .setColor("#444444")
.setTextFont("bold 20px Courier New")
.addText("LEVEL",110,200,100,100)
    .setTextAlign('center')
.setTextFont("bold 25px Courier New")
.addText(curlvl,137,220,100,100)
    .setColor("#444444")
.setTextFont("bold 15px Courier New")
.addText("Total XP",143,153,100,100)
.setTextFont("bold 13px Courier New")
.setTextAlign('right')
.addText(curxp,270,153,100,100)*/
    .setColor("#444444")
.setTextFont("bold 10px Courier New")
.setTextAlign('right')
.addText(curxp,280,165,100,100)
    .addText(curcredit,280,182,100,100)
.setTextAlign('center')
.setTextFont("bold 30px Courier")
.addText(curlvl,148,200,120,100)
    .setTextAlign('left')
.setTextFont("bold 10px Courier")
.addText(userprof,120,245,100,100)
    .toBufferAsync()
  }
  

await message.channel.send(`📜 | **User profile card for ${member.user.username}**`).then(async m=> await m.channel.send(new Discord.Attachment(await createProfile(), "profile.png")))

}
exports.info = {
  name:"profile",
  alias:[],
  type:"beta",
  permission:"default",
  guildOnly:true,
  usage:"(p)profile / (p)profile <@mention|id>",
  help:"checking your profile status"
}