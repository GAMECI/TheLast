
var PLAYGROUND_HEIGHT= 2000;
var PLAYGROUND_WIDTH = 2000;
var playerName;
var playerAnimation= new Array();
var alReady=false;
var alReadyZombie=false;
var gameOver = false;
var SPEED_ZOMBIE = 100;
var zombies = {};
var numZombies = 0;

var zombieAnimation= new Array();


var addPlayer= function(event){	
    if($("#"+event.name).val()!=undefined)
        $("#"+event.name).remove();
    if(event.status=="up" || event.status=="down"){
        $("#players").addSprite(event.name,{width:39,height:53,animation:playerAnimation[event.status],posx:event.x, posy:event.y});		
    }else{
        $("#players").addSprite(event.name,{width:53,height:39,animation:playerAnimation[event.status],posx:event.x, posy:event.y});		
    }
    
    alReady=true;
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



$(function(){

    //Animation declaration

    //Background Map
    var background3 = new $.gQ.Animation({imageURL:"./js/bg/background.png"});
             
                

    //Player		
	
    playerAnimation["idle"]=new $.gQ.Animation({imageURL:"./js/player/survivor-idle_handgun_0.png"})	
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
	

    //Initialize the game
    $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})
        .addGroup("background",{width: PLAYGROUND_WIDTH, height:PLAYGROUND_HEIGHT}).end()
        .addGroup("players",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT}).end()
        .addGroup("zombies",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT});

    //Intialize the background

    $("#background").addSprite("background3",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT,animation:background3});	
	
	
	$.playground().registerCallback(function(){		
		if(!gameOver){					
			app.updateZombie();			
			/**if(numZombies == 1){
				$(".tres").each(function(){
					var posZx = $(this).posx();
					var posZy = $(this).posy();
					
					var px = $("#"+playerName).x();
					var py = $("#"+playerName).y();
					
					if(py > posZy){
						$(this).posy(10, true);
						statusZ = "down";							
					}
					if(py < posZy){
						$(this).posy(-10, true);
						statusZ = "up"						
					}
					if(py == posZy){
						if(px > posZx){
							statusZ = "right";
							$(this).posx(10, true);
							
						}
						if(px < posZx){
							statusZ = "left";							
							$(this).posx(-10, true);
						}							
					}																				
					app.updateZombie($(this).id(), $(this).posx(), $(this).posy(), statusZ);			
				});													
			}**/
		}	
	}, SPEED_ZOMBIE);
	


    $("#start").click(function () {
            playerName= $('#idName').val();
            $.playground().startGame(function () {
                app.init($('#idGame').val());
                var ctrl=document.selectorColor.radio;
                for(i=0;i<ctrl.length;i++){
                    if(ctrl[i].checked){
						var color = ctrl[i].value;
                    }   
                }
                $("#index").remove();
                setTimeout(function (){                    
					app.publishPlayer(70,60,color,playerName,"idle");
					for(i=0; i<1;i++){						
						numZombies+=1;
						app.publishZombie(i,100,100,"idle")
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
                    break;
                case 37: //this is left! (left arrow)
                    app.updatePlayer(playerposx-10,playerposy,"left");					
                    break;
                case 38: //this is up! (up arrow)
                    app.updatePlayer(playerposx,playerposy-10,"up");					
                    break;
                case 39: //this is right (right arrow)
                    app.updatePlayer(playerposx+10,playerposy,"right");					
                    break;
                case 40: //this is down! (down arrow)
                    app.updatePlayer(playerposx,playerposy+10,"down");                    					
                    break;
            }									
        }		
    });
});
