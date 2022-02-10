
/*
function generator(waifuname){
    console.log("Searching for " + waifuname);


    for (var i= 0; i < 24;i++){
        console.log( )
        if(data[i].name == waifuname.toLowerCase()){
            console.log(data[i].name + " found!");

            var code = data[i].codes[Math.floor(Math.random()*data[i].codes.length)];

            console.log(data[i].codes)
            console.log("code: " + code);
            console.log("https://nhentai.net/g/"+ code);
            break;
        }
    }
}
*/

const codes = require('./codes.json')

console.log(codes.length)
client.on('messageReactionAdd', (reaction, user) => {
    let message = reaction.message, emoji = reaction.emoji;
    
    if (emoji.name == '✅') {

            message.guild.fetchMember(user.id).then(member => {
                message.guild.channels.create(dojin.title, {
                    type: 'GUILD_TEXT',
                    permissionOverwrites: [{
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL'],
                        deny: ['SEND_MESSAGES' ]
                }]})
            });
    }
        
        

}
const message = await msg.channel.send({ content: 'click ✅ to read', fetchReply: false });
await message.react('✅');