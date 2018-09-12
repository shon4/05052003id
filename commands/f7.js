const Discord = require('discord.js');
const fortnite = require('fortnitetracker-7days-stats');

exports.execute = (client, message, args) => {
    if(args.length < 2){
        message.channel.send("<:warning:410852302698708993> No player mentioned");
        return;
    }

    var name = "";
    for(var i = 1; i < args.length; i++){
        name += args[i] + " ";
    }
    name = name.trim(); // remove last space

    var url = "https://fortnitetracker.com/profile/pc/"
                                + encodeURIComponent(name);
    message.channel.startTyping();

    fortnite.getStats(name, "pc", (err, result) => {
        if(err){
            message.channel.send("<:warning:410852302698708993> Player not found");
            message.channel.stopTyping();
            return;
        }

        var msg = "";
        msg += "\nWins: " + result.wins;
        msg += "\nGames: " + result.matches;
        msg += "\nWinrate: " + ~~result.wr + "%";   // ~~ = absolute value
        msg += "\n\nKills: " + result.kills;
        msg += "\nkd: " + result.kd;
        msg += "\n\nPlaytime: " + ~~(result.minutesPlayed / 60) + "h";

        var embed = new Discord.RichEmbed()
            .setAuthor(result.accountName, "", url)
            .setDescription(msg)
            .setColor(9955331)
            .setURL(url)
            .setThumbnail(result.skinUrl);
            //https://cdn2.unrealengine.com/Fortnite%2Fhome%2Ffn_battle_logo-1159x974-8edd8b02d505b78febe3baacec47a83c2d5215ce.png

        message.channel.stopTyping();
        message.channel.send(embed);
    });
};

exports.info = {
    name: "f7",
    alias: ["fortnite7"],
    permission: "default",
    type: "util",
	guildOnly: false,
	help: "Shows fortnite stats from the last 7 days for the specified user. ex: !m.f7 HS - WXArtz"
};
