var request = "https://api.twitch.tv/helix/streams?first=100&user_login=RocketBeansTV&user_login=dahara2012&user_login=Otmar_Pi&user_login=nm_till_behme&user_login=snickers_30&user_login=olobrolo&user_login=update_eu&user_login=DoppelnullTV&user_login=wsr_alexanderhoeltke&user_login=WSRacingESports&user_login=od0c&user_login=JWicht";
//init();
setInterval(getStreams, 120000);
setInterval(refreshURL, 300000);
var token = "";

if(document.location.hash) {
    token = window.location.hash.substring(1);
    token = token.substring(token.indexOf("=") + 1,token.indexOf("&"));
    window.location.hash = "";
} else {
    window.location.replace("https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=u0z2ilzqnt4f4zjld9ph091e7ulezf&redirect_uri=https://dahara2012.github.io/TwitchApp/&scope=viewing_activity_read");
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
    xhr.setRequestHeader("Authorization", "Bearer "+token+"");

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
    xhr.setRequestHeader("Authorization", "Bearer "+token+"");

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

function refreshURL(){
    if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari, SeaMonkey
            xmlhttp=new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                request = xmlhttp.responseText;
            }
        };
        xmlhttp.open("GET", "https://dahara2012.github.io/TwitchApp/link.txt", false);
        xmlhttp.send();
}