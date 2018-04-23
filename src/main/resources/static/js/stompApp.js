var connected = false;
var warrior;
var bullet;

var app = (function () {


    var stompClient = null;
    var stompClientB = null;
    var idGame = 0;

    class Warrior {
        constructor(name, healt, color, score, x, y, status) {
            this.name = name;
            this.color = color;
            this.score = score;
            this.x = x;
            this.y = y;
            this.status = status;
        }
    }
    class Bullet{
        constructor(id, x, y){
            this.id = id;
            this.x= x;
            this.y = y;
        }
        
    }

    var connectAndSubscribeB = function(idG){
        idGame = idG;
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendpoint');
        stompClientB = Stomp.over(socket);
        stompClientB.connect({},function(frame){
            stompClientB.subscribe('/topic/bullet.'+idG, function(event){
                var jsonEvent = JSON.parse(event.body);
                if (jsonEvent.ERROR != undefined) {
                    console.log(event.ERROR);
                    alert("Cannot add the current bullet")
                    window.location.reload();
                }
            });
        });        
    };
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
            connectAndSubscribeB(idG);


        },
        publishBullet: function(id, posx,posy){
            if(stompClient!= null){
                var id = id;
                var x = posx;
                var y = posy;
                bullet = new Bullet(id, x, y);
                bullets.push(bullet);
                try{
                    stompClientB.send("/app/bullet." + idGame, {}, JSON.stringify(bullet));
                }catch(error){
                    alert("errrrroor");
                }
            }                        
        },
        updateBullet: function (posx, posy) {
            if (stompClient != null) {
                bullet.x = posx;
                bullet.y = posy;
                stompClientB.send("/app/bullet." + idGame, {}, JSON.stringify(bullet));
            }
        },
        publishPlayer: function (posx, posy, color, name, status) {
            if (stompClient != null) {
                var healt = 100;
                var score = 0;
                var x = posx;
                var y = posy;
                warrior = new Warrior(name, healt, color, score, x, y, status);
                warriors.push(warrior);
                try{
                    stompClient.send("/app/player." + idGame, {}, JSON.stringify(warrior));
                }catch(error){
                    alert("errrrroor");
                }
            }

        },
        updateSpecificPlayer: function (posx, posy, status,health, ubicacion) {
            if (stompClient != null) {
                warriors[ubicacion].x = posx;
                warriors[ubicacion].y = posy;
                warriors[ubicacion].status = status;
                warriors[ubicacion].healt += health;
                stompClient.send("/app/player." + idGame, {}, JSON.stringify(warriors[ubicacion]));
            }

        },
        updatePlayer: function (posx, posy, status,health) {
            if (stompClient != null) {
                warrior.x = posx;
                warrior.y = posy;
                warrior.status = status;
                warrior.healt = health;
                stompClient.send("/app/player." + idGame, {}, JSON.stringify(warrior));
            }

        },

        disconnect: function () {
            if (stompClient !== null) {
                stompClient.disconnect();
                stompClientB.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
        }
    };

})();