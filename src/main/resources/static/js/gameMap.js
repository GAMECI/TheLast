
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
var lastAtack=undefined;


var removeCharacters=function(event){
    $("#" + event.name).remove();
    for(i=0;i<3;i++){
            $("#" +i+event.name+"zombie").remove();  
    }
}


var addObject= function(event){
    $("#specialObject").addSprite("object"+event[0].type,{width:35, height:32, animation:specialObject[event[0].type], posx: event[0].posx,posy:event[0].posy});
};


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
	if($("#"+event.id+"zombie").val()!=undefined)
        $("#"+event.id+"zombie").remove();
    if(event.status=="up" || event.status=="down"){        		
		$("#zombies").addSprite(event.id+"zombie",{width:65,height:70,animation:zombieAnimation[event.status],posx:event.posx, posy:event.posy});
    }else{        		
		$("#zombies").addSprite(event.id+"zombie",{width:65,height:70,animation:zombieAnimation[event.status],posx:event.posx, posy:event.posy});
    }    
    alReadyZombie=true;
};


var testCollision = function(name){
    var coll = $("#"+name).collision().each(function(){

        if(this.id=="objectmedicine" || this.id=="objectammo"){
            if(this.id=="objectmedicine" && warrior.healt<100){
                warrior.healt=warrior.healt+25;
            }else if(warrior.ammo<22){
                warrior.ammo=warrior.ammo+1;
            }
            gameController.deleteSpecialObject();
            app.updateObject();
            $("#"+this.id).remove();
        }else if((this.id).includes("zombie") && warrior.healt>0){
            if(this.id != lastAtack){
                warrior.healt-=25;
                lastAtack=this.id;    
            }
            
        }else if(warrior.healt==0){
            finishGame();
        }
    });
    
};

var finishGame=function(){
    alert("Game Over");
    gameController.finishGame(function(){
        app.sendGameOver();    
        location.reload();
    });
}







$(function () {


    //Animation declaration

    //Background Map


    		
	
    playerAnimation["idle"]=new $.gQ.Animation({imageURL:"./js/player/survivor-idle_handgun_0.png"})	

    var background3 = new $.gQ.Animation({imageURL:"./js/bg/background.png"});
    var healthBarY = new $.gQ.Animation({imageURL:"./js/player/bar/yellow/100/22/bar.png"});         
    var healthBarB = new $.gQ.Animation({imageURL:"./js/player/bar/blue/100/22/bar.png"});         
    var healthBarG = new $.gQ.Animation({imageURL:"./js/player/bar/green/100/22/bar.pngbar.png"});         
    var healthBarR = new $.gQ.Animation({imageURL:"./js/player/bar/red/100/22/bar.png"});     
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
    specialObject["medicine"] = new $.gQ.Animation({imageURL:"./js/specialObject/medicine.png"})
    specialObject["ammo"] = new $.gQ.Animation({imageURL:"./js/specialObject/ammo.png"})
    //Initialize the game
    $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})

            .addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
            .addGroup("players", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
            .addGroup("zombies", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
            .addGroup("specialObject",{width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
            .addGroup("overlay",{width: PLAYGROUND_WIDTH, height:PLAYGROUND_HEIGHT});


    //Intialize the background


    $("#background").addSprite("background3", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT, animation: background3});	
	$.playground().registerCallback(function(){		
		if(!gameOver){					
			app.moveZombie();
            testCollision(playerName);						
		}	
	}, SPEED_ZOMBIE);


    $("#start").click(function () {

        playerName = $('#idName').val();
        $.playground().startGame(function () {
            var idGame=$('#idGame').val()
            initGame(idGame);
            document.getElementById("overlay").setAttribute("align","left");    
            $("#overlay").append("<br><div id='shieldHUD' style='background-color:"+color+" ; height:113px; width:28.6%; align:center;background-image: url(/js/player/bar/100/22.png);'><h2 style='position:absolute; left: 230px; top: 36px;'>"+playerName+"</h2></div>")
        });
    });

    var color;


    var initGame = function(idGame){
        subscribe(idGame,sendCharacters);
    };

    var subscribe = function(idGame,callback){
        app.init(idGame);
        var ctrl = document.selectorColor.radio;
        for (i = 0; i < ctrl.length; i++) {
            if (ctrl[i].checked) {
                color = ctrl[i].value;
            }
        }
        $("#index").remove();
        setTimeout(function(){
            callback();
        },3000);
    }

    var sendCharacters = function(){
        setTimeout(function(){
            app.publishPlayer(122,416,color,playerName,"idle");
            for(i=0; i<3;i++){                      
                app.publishZombie(i,500*i,500*i,"idle")
            }    
        },200);
    }
  
    
    $(document).keydown(function(e){
        if(alReady){
            var playerposx = $("#"+playerName).x();
            var playerposy = $("#"+playerName).y();
            $("#shieldHUD").remove();
            $("#overlay").append("<div id='shieldHUD' style='background-color:"+warrior.color+" ; height:113px; width:28.6%; align:center;background-image: url(/js/player/bar/"+warrior.healt+"/"+warrior.ammo+".png);'><h2 style='position:absolute; left: 230px; top: 36px;'>"+playerName+"</h2></div>")        
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

