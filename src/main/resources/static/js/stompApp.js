var connected = false;
var warrior;
var zombie1;
var zombie2;
var zombie3;
var zombiesList = new Array();

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

    class Object {
        contructor(x, y, type, id) {
            this.x = x;
            this.y = y;
            this.type = type;
        }
    }

    class Zombie {
        constructor(id, healt, posx, posy, status) {
            this.id = id;
            this.healt = healt;
            this.posx = posx;
            this.posy = posy;
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
            stompClient.subscribe('/topic/object.' + idG, function (event) {
                var jsonEvent = JSON.parse(event.body);
                if (jsonEvent.ERROR != undefined) {
                    console.log(event.ERROR);
                    alert("A player with  the same name already exists,  please try with other name or enter in other room ")
                    window.location.reload();
                } else {
                    addObject(jsonEvent);
                }

            });
            stompClient.subscribe('/topic/zombie.' + idG, function (event) {
                var jsonEvent = JSON.parse(event.body);
                addZombie(jsonEvent);

            });
            connected = true;
        });

    };
	
	var attack = function(){				
		warrior.healt -=25;
		stompClient.send("/app/player." + idGame, {}, JSON.stringify(warrior));				
	}

    var updateZombie = function (zombie) {

		if (stompClient != null) {            
		
			if(warrior.x == zombie.posx){
				attack();				
			}
			
            if (warrior.y > zombie.posy) {
                zombie.posy += 1;
                zombie.status = "down";
                //e.posy += 1;
                //e.status = "down";
                console.log("Tiene que bajar");
            }
            if (warrior.y < zombie.posy) {
                zombie.posy -= 1;
                zombie.status = "up";
                //e.posy -= 1;
                //e.status = "up"
                console.log("Tiene que subir");
            }
            if (warrior.y == zombie.posy) {
                if (warrior.x > zombie.posx) {
                    zombie.posx += 1;
                    zombie.status = "right";
                    //e.status = "right";
                    //e.posx += 1;								
                    console.log("Tiene que coger a la izquierda");
                }
                if (warrior.x < zombie.posx) {
                    zombie.posx -= 1;
                    zombie.status = "left";
                    //e.status = "left";								
                    //e.posx -= 1;
                    console.log("Tiene que coger a la derecha");
                }

            }
            stompClient.send("/app/zombie." + idGame, {}, JSON.stringify(zombie));


        }

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
                try {
                    stompClient.send("/app/player." + idGame, {}, JSON.stringify(warrior));
                } catch (error) {
                    alert("error");
                }
            }

        },

        publishZombie: function (idZom, posx, posy, status) {
            if (stompClient != null) {
                var healt = 100;
                var x = posx;
                var y = posy;

                var id = idZom;
                if (zombiesList.length == 0) {
                    zombie1 = new Zombie(id + warrior.name, healt, posx, posy, status);
                    try {
                        stompClient.send("/app/zombie." + idGame, {}, JSON.stringify(zombie1));
                        zombiesList.push(zombie1);
                    } catch (error) {
                        alert(error);
                    }
                } else if (zombiesList.length == 1) {
                    zombie2 = new Zombie(id + warrior.name, healt, posx, posy, status);
                    try {
                        stompClient.send("/app/zombie." + idGame, {}, JSON.stringify(zombie2));
                        zombiesList.push(zombie2);
                    } catch (error) {
                        alert(error);
                    }
                } else {
                    zombie3 = new Zombie(id + warrior.name, healt, posx, posy, status);
                    try {
                        stompClient.send("/app/zombie." + idGame, {}, JSON.stringify(zombie3));
                        zombiesList.push(zombie3);
                    } catch (error) {
                        alert(error);
                    }

                }
            }
        },

        moveZombie: function (zombie) {
            if (zombiesList.length == 3) {
                updateZombie(zombie1);
                updateZombie(zombie2);
				updateZombie(zombie3);
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





