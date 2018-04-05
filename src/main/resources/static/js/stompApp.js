var connected = false;
var warrior;

var app = (function () {


    var stompClient = null;
    var idGame = 0;

    class Warrior {
        constructor(name, healt, color, score, x, y, status) {
            this.name = name;
            this.healt = healt;
            this.color = color;
            this.score = score;
            this.x = x;
            this.y = y;
            this.status = status;
        }
    }

    var connectAndSubscribe = function (idG) {
        idGame = idG;
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);


        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);

            stompClient.subscribe('/topic/player.' + idG, function (event) {
                var jsonEvent = JSON.parse(event.body);
                if (jsonEvent.ERROR != undefined) {
                    console.log(event.ERROR);
                    alert("A player with  the same name already exists,  please try with other name or enter in other room ")
                    window.location.reload();
                } else {
                    addPlayer(jsonEvent);
                }

            });
            connected = true;
        });

    };



    return {

        init: function (idG) {
            //websocket connection
            connectAndSubscribe(idG);


        },

        publishPlayer: function (posx, posy, color, name, status) {
            if (stompClient != null) {
                var healt = 100;
                var score = 0;
                var x = posx;
                var y = posy;
                warrior = new Warrior(name, healt, color, score, x, y, status);
                try{
                    stompClient.send("/app/player." + idGame, {}, JSON.stringify(warrior));
                }catch(error){
                    alert("errrrroor");
                }
            }

        },

        updatePlayer: function (posx, posy, status) {
            if (stompClient != null) {
                warrior.x = posx;
                warrior.y = posy;
                warrior.status = status;
                stompClient.send("/app/player." + idGame, {}, JSON.stringify(warrior));
            }

        },

        disconnect: function () {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
        }
    };

})();