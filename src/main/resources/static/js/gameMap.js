
var PLAYGROUND_HEIGHT = 800;
var PLAYGROUND_WIDTH = 1500;
var BULLET_SPEED =  10;
var bullets = new Array();
var playerName;

var playerAnimation= new Array();
var zombieAnimation= new Array();
var specialObject= new Array();
var alReady=false;
var alReadyZombie=false;
var gameOver = false;
var SPEED_ZOMBIE = 1;
var zombies = {};
var numZombies = 0;



var addPlayer = function (event) {
    if ($("#" + event.name).val() != undefined)
        $("#" + event.name).remove();
    if (event.status == "up" || event.status == "down") {
        $("#players").addSprite(event.name, {width: 39, height: 53, animation: playerAnimation[event.status], posx: event.x, posy: event.y});
    } else {
        $("#players").addSprite(event.name, {width: 53, height: 39, animation: playerAnimation[event.status], posx: event.x, posy: event.y});
    }

    alReady = true;
};


var addZombie= function(event){		    
	if($("#"+event.id).val()!=undefined)
        $("#"+event.id).remove();
    if(event.status=="up" || event.status=="down"){        		
		$("#zombies").addSprite(event.id,{width:65,height:70,animation:zombieAnimation[event.status],posx:event.posx, posy:event.posy});
    }else{        		
		$("#zombies").addSprite(event.id,{width:65,height:70,animation:zombieAnimation[event.status],posx:event.posx, posy:event.posy});
    }    
    alReadyZombie=true;
};




var addObject= function (event){
    $("#specialObject").addSprite("heartUp",{width:35, height:32, animation:specialObject["moveUp"], posx: event.posx,posy:event.posy});
    $("#specialObject").addSprite("heartDown",{width:35, height:32, animation:specialObject["moveDown"], posx:event.posx,posy:event.posy});
}

$(function () {


    //Animation declaration

    //Background Map


    		
	
    playerAnimation["idle"]=new $.gQ.Animation({imageURL:"./js/player/survivor-idle_handgun_0.png"})	

    var background3 = new $.gQ.Animation({imageURL:"./js/bg/background.png"});
    var healthBarY = new $.gQ.Animation({imageURL:"./js/player/lifeBarY.png"});         
    var healthBarB = new $.gQ.Animation({imageURL:"./js/player/lifeBarB.png"});         
    var healthBarG = new $.gQ.Animation({imageURL:"./js/player/lifeBarG.png"});         
    var healthBarR = new $.gQ.Animation({imageURL:"./js/player/lifeBarR.png"});     
    bullets["bulletU"] = new $.gQ.Animation({imageURL:"./js/bullets/bulletU.png"});     
    bullets["bulletD"] = new $.gQ.Animation({imageURL:"./js/bullets/bulletD.png"});     
    bullets["bulletL"] = new $.gQ.Animation({imageURL:"./js/bullets/bulletL.png"});                 
    bullets["bulletR"] = new $.gQ.Animation({imageURL:"./js/bullets/bulletR.png"});     
    //Player

    playerAnimation["idle"] = new $.gQ.Animation({imageURL: "./js/player/survivor-idle_handgun_0.png"})

    playerAnimation["up"] = new $.gameQuery.Animation({imageURL: "./js/player/shooterUp.png"});
    playerAnimation["down"] = new $.gameQuery.Animation({imageURL: "./js/player/shooterDown.png"});
    playerAnimation["left"] = new $.gameQuery.Animation({imageURL: "./js/player/shooterLeft.png"});
    playerAnimation["right"] = new $.gameQuery.Animation({imageURL: "./js/player/shooterRight.png"});

	
	//Zombie		
	
    zombieAnimation["idle"] = new $.gameQuery.Animation({imageURL: "./js/zombie/imagen.png"});
    zombieAnimation["up"] = new $.gameQuery.Animation({imageURL: "./js/zombie/zombieUp.png"});
    zombieAnimation["down"] = new $.gameQuery.Animation({imageURL: "./js/zombie/zombieDown.png"});
    zombieAnimation["left"] = new $.gameQuery.Animation({imageURL: "./js/zombie/zombieLeft.png"});
    zombieAnimation["right"] = new $.gameQuery.Animation({imageURL: "./js/zombie/zombieRight.png"});
	

    //Special Object
    specialObject["moveUp"] = new $.gQ.Animation({imageURL:"./js/specialObject/GleefulDismalBluefintuna-max-1mb-0.png",numberOfFrame: 8, delta: 26, rate: 60, type: $.gQ.ANIMATION_VERTICAL})
    specialObject["moveDown"] = new $.gQ.Animation({imageURL:"./js/specialObject/GleefulDismalBluefintuna-max-1mb-1.png",numberOfFrame: 8, delta: 26, rate: 60, type: $.gQ.ANIMATION_VERTICAL})
    //Initialize the game
    $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})

            .addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
            .addGroup("players", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
            .addGroup("zombies", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
            .addGroup("specialObject",{width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})


    //Intialize the background


    $("#background").addSprite("background3",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT,animation:background3});	
	
	
	$.playground().registerCallback(function(){		
		if(!gameOver){					
			app.moveZombie();						
		}	
	}, SPEED_ZOMBIE);	


    $("#start").click(function () {

        playerName = $('#idName').val();
        $.playground().startGame(function () {
            app.init($('#idGame').val());
            var ctrl = document.selectorColor.radio;
            for (i = 0; i < ctrl.length; i++) {
                if (ctrl[i].checked) {
                    var color = ctrl[i].value;
                }
			}

			$("#index").remove();
                setTimeout(function (){                    
					app.publishPlayer(70,60,color,playerName,"idle");
					for(i=0; i<3;i++){						
						numZombies+=1;
						app.publishZombie(i,100+i*(100),100+i*100,"idle")
					}
                },800);
            })
    });
  
    

    $(document).keydown(function(e){
        if(alReady){
            var playerposx = $("#"+playerName).x();
            var playerposy = $("#"+playerName).y();
            switch(e.keyCode){
                case 32: //this is shoot (space)
                    //shoot missile here
                       //funcion que hace daño y actualiza el sprite y el guerrero con el app.damage
                    if(warrior.status == "left"){
                        $("#players").addSprite("bulletL",{width:47,height:47, animation:bullets["bulletL"], posx:playerposx,posy:playerposy});
                        //bullets.push();
                    }else if(warrior.status == "right"){
                        $("#players").addSprite("bulletR",{width:47,height:47, animation:bullets["bulletR"], posx:playerposx,posy:playerposy});
                    }else if(warrior.status == "up"){
                        $("#players").addSprite("bulletU",{width:47,height:47, animation:bullets["bulletU"], posx:playerposx,posy:playerposy});
                    }else{
                        $("#players").addSprite("bulletD",{width:47,height:47, animation:bullets["bulletD"], posx:playerposx,posy:playerposy});
                    }
                    break;
                case 37: //this is left! (left arrow)
                    app.updatePlayer(playerposx - 10, playerposy, "left");
                    break;
                case 38: //this is up! (up arrow)
                    app.updatePlayer(playerposx, playerposy - 10, "up");
                    break;
                case 39: //this is right (right arrow)
                    app.updatePlayer(playerposx + 10, playerposy, "right");
                    break;
                case 40: //this is down! (down arrow)
                    app.updatePlayer(playerposx, playerposy + 10, "down");
                    break;
            }
        }
    });
});

