var connected=false;

var app = (function () {


    var stompClient = null;
    var idGame=0;

    class Warrior{
        constructor(name,healt,color,score,x,y){
            this.name=name;
            this.healt=healt;
            this.color=color;
            this.score=score;
            this.x=x;
            this.y=y;
        }
    }
    
    var connectAndSubscribe = function (idG) {
        idGame=idG;
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);

        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            connected=true;
            stompClient.subscribe('/topic/player.'+idG, function (event) {
                var jsonEvent = JSON.parse(event.body);
                addPlayer(jsonEvent);
            });
        });

    };



    return {

        init: function (idG) {
            //websocket connection
            connectAndSubscribe(idG);
        },
        
        publishPlayer: function(posx,posy,color,name){
            if(stompClient != null){
                var healt=100;
                var score=0;
                var x=posx;
                var y=posy;
                var warrior=new Warrior(name,healt,color,score,x,y);
                stompClient.send("/app/player."+idGame,{},JSON.stringify(warrior));
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