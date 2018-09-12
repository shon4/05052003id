exports.execute = (client, message, args) => {
    if(args.length < 2){
        message.channel.send("no new avatar url specified");
        return;
    }
    client.user.setAvatar(args[1])
        .then(user => console.log("--> New avatar: " + user.avatarURL))
        .catch(console.error);
};

exports.info = {
    name: "setavatar",
    alias: ["setbotavatar"],
    permission: "admin",
    type: "admin",
  usage: "(p)setavatar",
    guildOnly: false,
	help: "Set bot avatar. Example: `.setavatar ImgURL`. \nPermission: `Admin`"
};
