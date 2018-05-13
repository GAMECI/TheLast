var connected = false;
var warrior;
var zombie;
var zombiesList = new Array();

var app = (function () {
	
	
    var stompClient = null;
    var idGame = 0;

    class Warrior {
        constructor(name, healt, color, score, x, y, status,ammo) {
            this.name = name;
            this.healt = healt;
            this.color = color;
            this.score = score;
            this.x = x;
            this.y = y;
            this.status = status;
            this.ammo =ammo
        }
    }
    
    class Object {
        contructor(x,y,type,id){
            this.x=x;
            this.y=y;
            this.type=type;
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
            stompClient.subscribe('/topic/object.' + idG, function (event) {
                var jsonEvent = JSON.parse(event.body);
                    addObject(jsonEvent);

            });
            stompClient.subscribe('/topic/zombie.'+idG, function (event){				
                var jsonEvent = JSON.parse(event.body);				
                addZombie(jsonEvent);
				
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
                var ammo = 21;
                var healt = 75;
                var score = 0;
                var x = posx;
                var y = posy;
                warrior = new Warrior(name, healt, color, score, x, y, status,ammo);
                try{
                    stompClient.send("/app/player." + idGame, {}, JSON.stringify(warrior));
                }catch(error){
                    alert("error");
                }
            }

        },

				
	publishZombie: function(idZom, posx,posy,status){						
            if(stompClient != null){
                var healt=100;                
                var x=posx;
                var y=posy;           
		var id=idZom;	
		zombie = new Zombie(warrior.name + id, healt,posx,posy,status);								
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
		zombiesList.forEach(function (e, i, zombiesList){										
                    if(warrior.y > e.posy){
			console.log("Tiene que subir");
                    }
                    if(warrior.y < e.posy){
			console.log("Tiene que bajar");
                    }
                    if(warrior.y == e.posy){
			if(warrior.x > e.pox){
                            console.log("Tiene que coger a la izquierda");
			}else{
                            console.log("Tiene que coger a la derecha");
                        }	
						
                    }
		});
		/**for(i=0;i<zombiesList.length; i++){					
                    zombiesList[i].posx+=5;
                    stompClient.send("/app/zombie."+idGame,{},JSON.stringify(zombiesList[i])); 						
		}**/
		/**var x=zombiesList[0].posx +10;
                var y=zombiesList[0].posy;		
		zombiesList[0].posx= x;
		zombiesList[0].posy= y;										
		stompClient.send("/app/zombie."+idGame,{},JSON.stringify(zombiesList[0]));**/ 						
				
				
				
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


	
	

