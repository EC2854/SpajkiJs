const data = require( src="./codes.json")
//var console = getelementById("output")

function generator(waifuname){
    console.log("Searching for " + waifuname);


    for (var i= 0; i < 24;i++){
        console.log( )
        if(data[i].name == waifuname){
            console.log(data[i].name + " found!");

            var code = data[i].codes[Math.floor(Math.random()*data[i].codes.length)];
            console.log(data[i].codes)
            console.log("code: " + code);
            console.log("https://nhentai.net/g/"+ code);
            break;
        }
    }
}
generator("nami-onepiece");
/*
generator("");
function printnames(){
    for (var i= 0; i < 24;i++){
        getelementById("nav").innerHTML(nav + "<br>" +  data[i].name)

    }
}
*/