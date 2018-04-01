var connected=false;
var warrior;
var zombie;

var app = (function () {


    var stompClient = null;
    var idGame=0;
	var numZombie=0;

    class Warrior{
        constructor(name,healt,color,score,x,y,status){
            this.name=name;
            this.healt=healt;
            this.color=color;
            this.score=score;
            this.x=x;
            this.y=y;
            this.status=status;
        }
    }
	
	class Zombie{		
		constructor(id, healt,posx,posy,status){
			this.id=id;
			this.healt=healt;
			this.posx=posx;
			this.posy=posy;		
			this.status=status;			
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
			
            stompClient.subscribe('/topic/player.'+idG, function (event){				
                var jsonEvent = JSON.parse(event.body);				
                addPlayer(jsonEvent);				
            });
			
			stompClient.subscribe('/topic/zombie.'+idG, function (event){				
                var jsonEvent = JSON.parse(event.body);				
                addZombie(jsonEvent);
				
            });
			
			
			
            connected=true;
        });

    };



    return {

        init: function (idG) {
            //websocket connection
            connectAndSubscribe(idG);
            
            
        },
        
        publishPlayer: function(posx,posy,color,name,status){
            if(stompClient != null){
                var healt=100;
                var score=0;
                var x=posx;
                var y=posy;
                warrior=new Warrior(name,healt,color,score,x,y,status);				
                stompClient.send("/app/player."+idGame,{},JSON.stringify(warrior));								
            }
            
        },
				
		publishZombie: function(posx,posy,status){			
			numZombie+=1;
            if(stompClient != null){
                var healt=100;                
                var x=posx;
                var y=posy;                
				zombie = new Zombie(numZombie, healt,posx,posy,status);				
                stompClient.send("/app/zombie."+idGame,{},JSON.stringify(zombie));								
            }            
        },
        
        updatePlayer: function(posx,posy,status){
            if(stompClient != null){
                warrior.x=posx;
                warrior.y=posy;
                warrior.status=status;
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