const https = require('https');
const superagent = require('superagent')
const Discord = require('discord.js');
const { resolve, join } = require("path")
const { Canvas } = require('canvas-constructor')
//const { get } = require('snekfetch')
const { Attachment } = require ('discord.js')
exports.execute = async (client, message, args) => {
  
    var name = "";
    for(var i = 1; i < args.length; i++){
        name += args[i] + " ";
    }
    name = name.trim(); // remove last space

    if(name === "" || name.indexOf(":") > -1 || !isValid(name)){
        var emoji = client.emojis.find("name", "aaa");
        if(emoji === null) emoji = ":(";
        message.channel.send(`Illegal argument ${emoji}`);
        return;
    }

    var options = {
        host: 'api.fortnitetracker.com',
        path: '/v1/profile/pc/' + encodeURIComponent(name),
        port: 443,  // isnt this used for mail?
        method: 'GET',
        headers: { 'TRN-Api-Key': client.config.TRN_APIKEY }
    };

    var req = https.request(options, function(res){
        var body = "";
        res.on('data',async function(data){
            body += data;
        });
        res.on('end', async end => {
            body = JSON.parse(body);
            console.log(body);    // debug

            // player not found
            if(body.error){
                var emoji = client.emojis.find("name", "feelsbadman");
                if(emoji === null) emoji = ":(";
                message.channel.send(`Player not found ${emoji}`);
                return;
            }
            // player found
            var epicName = body["epicUserHandle"];
            var platform = body["platformName"];
            var score = body.lifeTimeStats[6]["value"];
            var matchesPlayed = body.lifeTimeStats[7]["value"];
            var wins = body.lifeTimeStats[8]["value"];
            //var timePlayed = body.lifeTimeStats[13]["value"]; // removed from API?
            var wr = body.lifeTimeStats[9]["value"];
            var kills = body.lifeTimeStats[10]["value"];
            var kd = body.lifeTimeStats[11]["value"];
            //var killsPerMin = body.lifeTimeStats[12]["value"];
            var url = "https://fortnitetracker.com/profile/pc/"
                               + encodeURIComponent(name);
      
         // async function canvas(){
            
            async function createCanvas() {
       var { body: fortnite } = await superagent('https://imgdb.net/images/4006.jpg')
      //    function createCanvas(){
            return new Canvas(600,400)
/*.addImage(fortnite,0,0,600,400)
.setColor("#E7F3F3")
.setTextFont("bold 20pt Arial")
              .setTextAlign('center')
.addText(epicName,110,110)        
.setTextFont("bold 17pt Arial")
.setTextAlign('center')
.addText(wins,45,153)
.addText(kd,123,153)
.addText(wr,190,153)         
.setTextFont("bold 15pt Arial")
.setTextAlign('left')
.addText(kills,25,220)
.addText(matchesPlayed,20,255)  */
              
.addImage(fortnite,0,0,600,400)
.setColor("#ffb700")
.setTextFont("bold 35px Comic Sans MS")
.setTextAlign("center")
.addText(epicName,304,120,200,100)
.addText(kills,300,210)
.addText(wins,130,210)
.addText(wr,495,210)
.addText(kd,399,310)
.addText(matchesPlayed,210,310)
              
.toBufferAsync()
              Canvas.registerFont(resolve(join(__dirname, "./path/to/font/BurkbankBigCondensed-Black.ttf")), "Fortnite");
}  
            
         //  return message.channel.send(new Attachment( createCanvas()))
        //  }
await  message.channel.send(new Discord.Attachment(await createCanvas(), "file-fortnite.jpg"))

        //   var msg = "";
       //     msg += "\nwins: " + wins;
         //   msg += "\ngames: " + matchesPlayed;
         //   msg += "\nwinrate: " + wr;
         //   msg += "\n\nkills: " + kills /* + " (" + killsPerMin + "/min)"*/ ;
          //  msg += "\nkd: " + kd;
         //   msg += "\n\nplaytime: " + 0;

       //     var embed = new Discord.RichEmbed()
        //        .setAuthor(epicName, "", url)
        //        .setDescription(msg)
         //       .setColor(9955331)
         //       .setURL(url)
            //    .setThumbnail("https://cdn2.unrealengine.com/Fortnite%2Fhome%2Ffn_battle_logo-1159x974-8edd8b02d505b78febe3baacec47a83c2d5215ce.png");
        
                     
           
          
        });
          
    });

    req.end();
};


function isValid(str){
    return !/[~`!#$%\^&*+=\[\]\\';,/{}|\\":<>\?]/g.test(str);


}
exports.info = {
    name: "fortnite",
    alias: ["fn", "f"],
    permission: "default",
    type: "util",
  usage: "(p)fortnite [username]",
    guildOnly: false,
	help: "Show lifetime Fortnite stats. ex: `!m.f Ninja`"
};