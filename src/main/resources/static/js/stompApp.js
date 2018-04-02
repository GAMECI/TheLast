var connected=false;
var warrior;
var zombie;
var zombiesList = new Array();

var app = (function () {


    var stompClient = null;
    var idGame=0;
	

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
				
		publishZombie: function(idZom, posx,posy,status){						
            if(stompClient != null){
                var healt=100;                
                var x=posx;
                var y=posy;           
				var id=idZom;	
				zombie = new Zombie(warrior.name + id, healt,posx,posy,status);				
				zombiesList.push(zombie);
                stompClient.send("/app/zombie."+idGame,{},JSON.stringify(zombie));								
            }										
        },
		
		updateZombie: function(){
            if(stompClient != null){    
				
				/**var x=zombiesList[0].posx +10;
				var y=zombiesList[0].posy;		
				zombiesList[0].posx= x;
				zombiesList[0].posy= y;										
				stompClient.send("/app/zombie."+idGame,{},JSON.stringify(zombiesList[0])); 						
				
				var x=zombiesList[1].posx -10;
				var y=zombiesList[1].posy;		
				zombiesList[1].posx= x;
				zombiesList[1].posy= y;										
				stompClient.send("/app/zombie."+idGame,{},JSON.stringify(zombiesList[1])); 						
				
				var x=zombiesList[2].posx;
				var y=zombiesList[2].posy-10;		
				zombiesList[2].posx= x;
				zombiesList[2].posy= y;										**/
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