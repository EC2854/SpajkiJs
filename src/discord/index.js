//config file
const config = require( src="./config.json");
const data = require(src="../nhentai/codes.json");

//some discord shit
const Discord = require("discord.js");
const { Client, Intents, MessageEmbed  } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//nhentai api
const nhentai = require('nhentai-js')
var urlObject

//idk why i put this here but I think it's cool or something
console.log("version: " + String(config.version));
console.log("prefix: "+ String(config.prefix));
console.log('starting...');



client.on("ready", () =>{
    console.log('ready');

});

client.on("message", msg=>{
    
    //comedy genius
    if(msg.content === "kto"){msg.reply("pytal")};

    if(msg.content.startsWith(config.prefix)){
        msgcon = msg.content.substring(1);
        
        //simple ping-pong command
        if (msgcon === "ping"){
            msg.channel.send("pong");
        
        //view nhentai page
        }else if(msgcon.startsWith("view_page")){
            const convp = msgcon.split(' ');
            const codevp = convp[1]
            const pagenvp = convp[2]-1

            var dojinvp
            (async()=>{
                if(nhentai.exists(codevp)){
                    dojinvp = await nhentai.getDoujin(codevp)
                    
                    const Embedvp = new MessageEmbed()
                        .setColor('#DF2650')
                        .setTitle(dojinvp.title)
                        .setImage(dojinvp.pages[pagenvp])
                        .setFooter("Page "+ (pagenvp + 1) + "/" + dojinvp.pages.length )

                    msg.channel.send({ embeds: [Embedvp] })
                }
            })();

        //list of waifus
        }else if(msgcon === "list"){
            var list
            for (var i= 0; i < 27; i++){
                
                if(i==0)list= data[i].name;
                else list = list +  "\n"+ data[i].name
            }
                const List = new MessageEmbed()
                    .setColor('#DF2650')
                    .setTitle('List of Waifus')
                    .setDescription(list)

                    msg.channel.send({ embeds: [List] })
            

        //Generator!!
        }else if (msgcon.startsWith("nhentai")){

            var waifuname = msgcon.split("nhentai ")[1];
            
            //Search for waifu in ../nhentai/codes.json
            for (var i= 0; i < 27; i++){
            
                if(data[i].name == waifuname){

                    //code = code big brain time
                    code = data[i].codes[Math.floor(Math.random()*data[i].codes.length)];

                    
                    //nhentai api 
                    var dojin
                    (async () => {
                        if(nhentai.exists(code)) {
                            dojin = await nhentai.getDoujin(code)

                            const embed = new MessageEmbed()
                                .setColor('#DF2650')
                                .setTitle(dojin.title)
                                .setURL('https://nhentai.net/g/' + code )
                                .setThumbnail(dojin.thumbnails[0])
                                .addFields(
                                    { name: 'Code:', value: code.toString(), inline: true }
                            )
                            msg.channel.send({ embeds: [embed] })
                                

                        }
                    })();
                }
            }
        }
}});

//login
client.login(String(config.token));
/*
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⢟⢟⢻⢹⢫⡛⡻⡻⡻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⠿⣛⢍⠦⡱⡱⣑⠕⡕⡥⡱⡕⡕⣕⢢⢫⢹⢻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⢍⢆⢣⢣⢢⢣⢣⢳⢸⢰⢕⢕⡪⡪⣪⢪⢪⢆⡇⡇⣇⢎⢪⢛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⡑⡌⡪⡰⡱⡱⡱⡳⣕⡯⣮⣗⣵⣳⢾⢽⣺⣞⣯⢷⢯⢷⢵⡳⣕⡕⡕⢝⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⡿⡫⢊⠌⡆⡕⣕⣵⣳⢽⢽⣫⣷⣻⣳⣻⢾⡽⣽⢯⣷⣻⣞⡿⣽⢯⡯⣟⣮⡻⣎⢧⡊⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡟⡑⢌⢢⢱⡸⣪⢗⣗⣗⢿⢽⣳⣻⣺⢽⡽⣯⣻⢽⡽⣞⣗⡯⣯⢯⣻⣺⡳⣳⢽⡺⣝⢮⡢⣻⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡟⠔⢌⠢⡪⡪⡮⡳⣝⢮⢮⡫⣗⢗⣗⣝⢗⡽⣺⡪⡻⡺⡵⡳⡝⡮⣫⢺⢜⢮⢳⢣⢯⣪⡳⡵⡘⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⠇⡑⠄⠕⡸⡱⡝⣝⢮⡳⡳⡝⣎⢧⢳⣸⡱⣱⡱⣕⢽⢜⢮⡺⡪⣞⣜⢮⢮⢮⢎⡧⣳⢕⢵⡹⡌⢾⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⠡⠨⡨⠊⡜⢜⢜⢎⢗⣝⢮⢯⡺⣝⣗⣗⡯⡷⡯⣗⡯⣯⡳⡽⣽⡺⡾⡽⣝⡷⣝⣞⢗⢝⡕⣇⢇⢽⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡏⢌⠰⡐⡑⢌⢎⢪⢪⡳⡵⡽⣕⡯⣗⢗⢗⢯⢫⡫⡳⡝⡎⡏⡝⡎⡎⢯⠹⡪⡪⡳⢭⢳⡳⡽⣺⢜⠔⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⢂⢂⢂⠢⡊⡢⡱⡱⡵⡯⡯⠯⡳⡹⠸⡘⡘⡐⠅⢊⠂⠅⠕⡡⡑⢌⠨⠐⡁⡊⢐⠁⡊⠐⠅⢍⠪⠹⡨⣻⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⢀⠂⢄⠕⡌⡪⡸⢸⠘⢌⢂⢑⢐⢈⠐⡀⠄⠐⡈⠠⢈⠨⠐⡐⠄⠅⠂⡁⠄⠂⡀⠂⢄⢅⢕⢢⢊⢐⢐⢜⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⠠⠨⠐⡌⢎⢪⢊⠢⢁⢂⠢⠪⡒⢕⠱⡐⠅⡂⢐⠄⢂⠠⢁⢂⠅⡅⠅⡀⠂⡁⠄⠡⢑⢐⠡⠱⠐⢄⠢⡑⣿⣿⣿⣿⣿⣿
⣿⣿⣿⢳⢄⠊⡐⢜⢸⠰⡡⡑⡐⠄⡑⠡⠁⠅⠂⠂⢂⠐⢀⠐⠠⢐⢐⣕⣕⡕⡅⡐⠠⠄⡂⢁⠠⠄⡂⠡⡈⠄⡌⢎⢺⣿⣿⣿⣿⣿
⣿⣿⣿⠄⢇⠧⡀⡣⡊⡎⡲⡨⡠⡡⡐⢄⠅⢊⠄⡁⡂⠅⡐⢠⢑⠔⣕⢵⣳⢽⣪⢌⢢⢁⢂⠂⢂⢂⢂⠣⡱⡱⣕⢕⢝⣿⣿⣿⣿⣿
⣿⣿⡗⡰⡣⠡⠣⡊⢆⢣⢣⡳⣵⣣⡣⡑⠌⠂⢂⢂⢐⢰⢨⠪⡢⡫⡮⣻⣺⣻⡮⣇⢧⢱⢱⢨⢰⢀⣂⢪⢪⡺⣎⢧⠣⣿⣿⣿⣿⣿
⣿⣿⡏⡐⠈⢨⢜⢌⢊⢎⢎⢞⡺⡪⢮⠫⡍⢎⢆⢖⢜⣔⡕⢕⡵⣝⣞⢷⣻⣽⣽⣳⣝⢮⣺⣊⢞⢼⢔⢵⡱⡹⡸⡸⡸⣸⣿⣿⣿⣿
⣿⣿⣷⡐⢅⠪⡣⡑⠔⢌⢎⢎⢎⢎⢎⣪⡪⡮⣳⠽⢕⢕⣜⡷⣯⢷⣝⣯⢿⣳⢯⢷⢯⣻⢾⢽⡳⡑⠽⣕⢧⢳⢱⢱⢑⢼⣿⣿⣿⣿
⣿⣿⣿⡌⢧⣊⢪⠨⡊⡢⡡⡃⡇⣏⢞⢜⣎⢯⡪⢍⠢⡘⡐⠍⠝⢝⠺⡺⠹⡪⡙⢍⢓⠝⢌⢑⢐⠌⠨⡘⡜⣕⢕⢕⠰⣹⣿⣿⣿⣿
⣿⣿⣿⣯⠪⡪⡢⡕⠰⠨⡢⠪⡸⡰⡱⣣⢳⠱⡨⠢⣝⢵⡐⢄⠌⠄⠌⠠⠑⡐⢈⠂⠡⠨⡐⡔⡭⣣⠡⢐⠨⠪⡪⢢⠱⣸⣿⣿⣿⣿
⣿⣿⣿⣿⣎⣪⣊⣌⠪⡨⢂⠣⠪⡘⡜⢜⢌⠪⡐⣝⢎⢧⢣⢣⢑⢅⠅⢅⠂⠄⢂⢈⠨⣈⡢⡡⢣⢳⢹⢔⠨⡨⠨⠢⡑⢼⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣗⠅⡊⢔⠡⡑⠌⠜⢌⢢⢑⢼⢸⢜⢕⢕⢕⢕⠥⠣⡓⡊⡚⠢⡃⠫⢨⠨⣊⢣⠣⡣⡣⡣⡘⢌⢂⢊⢾⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⡨⢂⠅⠪⢐⠡⡑⡑⢔⢸⢸⠸⠨⡨⠪⠊⢔⠡⢃⢂⠢⠈⠂⡊⠌⠄⠅⠂⠅⡊⠔⢈⠢⡊⢆⢂⠢⣻⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⡇⡂⡪⢈⢂⢂⠢⢡⠡⡃⠕⡈⠠⠈⠄⠑⠠⠈⠠⠄⠂⢁⠐⠄⠄⢁⢈⢠⢁⢄⡐⡐⠨⠨⠢⡡⠡⣻⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⡐⠄⢅⠂⡂⠌⡂⠅⡂⠅⠂⠌⢌⢆⢇⡇⡯⡽⡽⡽⣳⡻⡝⡯⡯⡯⡳⡝⡎⢎⢜⠨⡈⠪⡐⠡⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠊⡐⡐⠄⠅⡂⠅⡐⠠⢁⢑⢑⢌⠢⠩⢊⢎⠪⡱⢑⠕⢕⢕⢑⡑⡅⠇⠣⡑⢅⠢⢈⠢⠨⢨⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠂⡐⡈⡐⠠⠡⠐⡈⢀⠢⠡⢂⠕⡈⠠⠄⡈⠄⠁⠌⠐⠄⢂⠠⠐⡈⠔⡨⠐⡈⠄⠌⢌⣾⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠄⠄⢀⠂⠡⠈⠄⡀⠂⠨⠠⡁⡂⢂⠡⠄⠄⠐⡀⠂⢀⠁⢄⢐⢀⢂⠅⡂⠡⠐⡈⢐⢸⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡑⢅⠠⠐⠄⠁⠄⠐⠈⠠⢁⠢⠨⡂⠪⡨⢊⠌⡂⡑⠄⠕⡰⢐⠕⡐⢅⠊⠄⠁⠄⡂⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⠟⢉⠂⠄⠠⠈⡐⠅⢂⠈⠄⠂⠈⡀⢁⠐⢈⠂⠌⠌⡂⠅⢊⠐⠠⠁⠅⠂⡂⠅⢊⠐⢈⠄⠡⢁⠢⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡟⠡⠐⠄⡂⠈⠄⠂⠄⠄⢀⠄⠁⠄⠁⠄⡀⠄⠂⢀⠡⠐⠄⠂⠠⠈⠠⠈⠄⠂⠠⠈⢀⠈⠄⠄⢁⢢⠱⡹⣿⣿⣿⣿⣿⣿
⣿⣿⠟⡉⠄⠡⠈⡀⠂⡐⠐⠈⠄⠂⠄⠄⠁⠠⠈⠄⠄⠄⠈⠄⠄⠄⠐⠈⠄⠄⠄⠂⠁⠈⠄⠄⠄⠄⠂⠌⢔⢢⢣⢃⠈⡉⢉⠙⡻⣿
⣿⠏⢀⠄⡐⠈⠄⡀⠂⠠⠈⠄⢁⠈⠠⠐⠄⠄⠐⠄⠄⠂⠄⠠⠄⠂⠄⠠⠄⢀⠄⠄⠄⠠⠐⠄⠐⠨⡈⡊⡢⡱⡸⢰⠄⠄⠄⠂⠠⢉
⠃⠨⠄⡂⢂⠈⠄⠠⠐⢀⠂⠈⠄⠄⠁⠠⠄⠠⠄⠐⠄⠄⠐⠄⠄⠄⠄⠄⢀⠄⢀⠈⠄⠄⠄⠂⠁⡁⢂⢅⢪⢰⢸⢨⠄⠠⠄⠐⠄⠄
mao tlenu

⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠛⠛⠛⠋⠉⠈⠉⠉⠉⠉⠛⠻⢿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⢿⣿⣿⣿⣿
⣿⣿⣿⣿⡏⣀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣤⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿
⣿⣿⣿⢏⣴⣿⣷⠀⠀⠀⠀⠀⢾⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿
⣿⣿⣟⣾⣿⡟⠁⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣷⢢⠀⠀⠀⠀⠀⠀⠀⢸⣿
⣿⣿⣿⣿⣟⠀⡴⠄⠀⠀⠀⠀⠀⠀⠙⠻⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⣿
⣿⣿⣿⠟⠻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠶⢴⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⣿
⣿⣁⡀⠀⠀⢰⢠⣦⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⣿⣿⣿⡄⠀⣴⣶⣿⡄⣿
⣿⡋⠀⠀⠀⠎⢸⣿⡆⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⠗⢘⣿⣟⠛⠿⣼
⣿⣿⠋⢀⡌⢰⣿⡿⢿⡀⠀⠀⠀⠀⠀⠙⠿⣿⣿⣿⣿⣿⡇⠀⢸⣿⣿⣧⢀⣼
⣿⣿⣷⢻⠄⠘⠛⠋⠛⠃⠀⠀⠀⠀⠀⢿⣧⠈⠉⠙⠛⠋⠀⠀⠀⣿⣿⣿⣿⣿
⣿⣿⣧⠀⠈⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠟⠀⠀⠀⠀⢀⢃⠀⠀⢸⣿⣿⣿⣿
⣿⣿⡿⠀⠴⢗⣠⣤⣴⡶⠶⠖⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡸⠀⣿⣿⣿⣿
⣿⣿⣿⡀⢠⣾⣿⠏⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠉⠀⣿⣿⣿⣿
⣿⣿⣿⣧⠈⢹⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿
⣿⣿⣿⣿⡄⠈⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣾⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣦⣄⣀⣀⣀⣀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠙⣿⣿⡟⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠁⠀⠀⠹⣿⠃⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⢐⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⠿⠛⠉⠉⠁⠀⢻⣿⡇⠀⠀⠀⠀⠀⠀⢀⠈⣿⣿⡿⠉⠛⠛⠛⠉⠉
⣿⡿⠋⠁⠀⠀⢀⣀⣠⡴⣸⣿⣇⡄⠀⠀⠀⠀⢀⡿⠄⠙⠛⠀⣀⣠⣤⣤⠄
*/

