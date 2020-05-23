var request = "https://api.twitch.tv/helix/streams?first=100&user_login=RocketBeansTV&user_login=dahara2012&user_login=Otmar_Pi&user_login=nm_till_behme&user_login=snickers_30&user_login=olobrolo&user_login=update_eu&user_login=DoppelnullTV&user_login=wsr_alexanderhoeltke&user_login=WSRacingESports&user_login=od0c&user_login=JWicht";
init();
setInterval(getStreams, 120000);

var token = window.location.hash.substring(1);
if(document.location.hash) {
    window.location.hash = "";
} else {
    // No hash found
}

function init(){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        let miefert = "";
        let response = JSON.parse(this.response);
        for (let index = 0; index < response.data.length; index++) {
            console.log(response.data[index]);
            miefert += "<button style='width:100%;' onclick='startStream(\""+response.data[index].user_name+"\")'>"+response.data[index].user_name+": "+response.data[index].title+"</button>";
        }
        document.getElementById("list").innerHTML = miefert;
        startStream(response.data[0].user_name)
    }
    });

    xhr.open("GET", request);
    xhr.setRequestHeader("Client-ID", "u0z2ilzqnt4f4zjld9ph091e7ulezf");
    xhr.setRequestHeader("Authorization", "Bearer 2ffvff7nlq2p7m2fdy3kq9n2jo3glc");

    xhr.send();
}

function getStreams(){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        let miefert = "";
        let response = JSON.parse(this.response);
        for (let index = 0; index < response.data.length; index++) {
            console.log(response.data[index]);
            miefert += "<button style='width:100%;' onclick='startStream(\""+response.data[index].user_name+"\")'>"+response.data[index].user_name+": "+response.data[index].title+"</button>";
        }
        document.getElementById("list").innerHTML = miefert;
    }
    });

    xhr.open("GET", request);
    xhr.setRequestHeader("Client-ID", "u0z2ilzqnt4f4zjld9ph091e7ulezf");
    xhr.setRequestHeader("Authorization", "Bearer 2ffvff7nlq2p7m2fdy3kq9n2jo3glc");

    xhr.send();
}

function startStream(channel){
    document.getElementById("twitch-embed").innerHTML = "";
    new Twitch.Embed("twitch-embed", {
        width: "100%",
        height: "100%",
        channel: channel,
        theme: "dark",
        layout: "video",
      });

    let chat = '<iframe frameborder="0" scrolling="no" id="chat_embed" src="https://www.twitch.tv/embed/'+channel+'/chat" height="100%" width="100%"></iframe>';
    document.getElementById("chat").innerHTML = chat;
}

