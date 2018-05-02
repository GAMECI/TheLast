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
				zombie = new Zombie(id, healt,posx,posy,status);								
				try{
					stompClient.send("/app/zombie."+idGame,{},JSON.stringify(zombie));			
					zombiesList.push(zombie);				
				}catch(error){
					alert(error);
				}
            }										
        },
		
		updateZombie: function(){			
            if(stompClient != null){
				/**if(zombiesList.length == 1){					
					zombiesList[idz].posx = xz;
					zombiesList[idz].posy = xy;
					zombiesList[idz].status = sz;
					stompClient.send("/app/zombie."+idGame,{},JSON.stringify(zombiesList[idz]));			
				}**/
				if(zombiesList.length == 3){					
					//zombiesList.forEach(function (e, i, zombiesList){														
					for(var i =0;i<1;i++){						
						if(warrior.y > zombiesList[i].posy){
							zombiesList[i].posy +=1;
							zombiesList[i].status = "down";
							//e.posy += 1;
							//e.status = "down";
							console.log("Tiene que bajar");
						}
						if(warrior.y < zombiesList[i].posy){
							zombiesList[i].posy -=1;
							zombiesList[i].status = "up";
							//e.posy -= 1;
							//e.status = "up"
							console.log("Tiene que subir");
						}
						if(warrior.y == zombiesList[i].posy){
							if(warrior.x > zombiesList[i].posx){
								zombiesList[i].posx +=1;
								zombiesList[i].status = "right";
								//e.status = "right";
								//e.posx += 1;								
								console.log("Tiene que coger a la izquierda");
							}
							if(warrior.x < zombiesList[i].posx){
								zombiesList[i].posx -=1;
								zombiesList[i].status = "left";
								//e.status = "left";								
								//e.posx -= 1;
								console.log("Tiene que coger a la derecha");
							}	
							
						}
						stompClient.send("/app/zombie."+idGame,{},JSON.stringify(zombiesList[i]))	;			
					};										
				}
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


	
	

