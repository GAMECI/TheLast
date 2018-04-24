
var PLAYGROUND_HEIGHT = 2000;
var PLAYGROUND_WIDTH = 2000;
var BULLET_SPEED =  10;
var REFRESH_RATE = 15;
var healts = new Array();
var bullets = new Array();
var bulletsD = {};
var playerName;
var playerAnimation = new Array();
var alReady = false;
var gameOver = false;
var bulletCounter = 0;
var playersNames = new Array();
var warriors = new Array();
var content = "The aviable games were: " ;
var aviableGames = new Array();

var modifyClient = function(){

            aviableGames.push(0);
            for(i = 0; i< aviableGames.length; i++){
                content +=aviableGames[i]+"  "; 
            }
            return content;

};


var addPlayer = function (event) {
    if ($("#" + event.name).val() != undefined)
        $("#" + event.name).remove();
        
    if (event.status == "up" || event.status == "down") {
        $("#players").addSprite(event.name, {width: 39, height: 53, animation: playerAnimation[event.status], posx: event.x, posy: event.y});
    } else {
        $("#players").addSprite(event.name, {width: 53, height: 39, animation: playerAnimation[event.status], posx: event.x, posy: event.y});
    }
    playersNames.push(event.name);
    alReady = true;
};

var updateHealth = function(war){
        if(warrior.healt == 75){
            if(warrior.color == "blue"){
                $("#healthBar").setAnimation(healts["healthBar75B"]);
            }else if(warrior.color=="green"){
                $("#healthBar").setAnimation(healts["healthBar75G"]);
            }else if(warrior.color =="red"){
                $("#healthBar").setAnimation(healts["healthBar75R"]);
            }else if(warrior.color =="yellow"){
                $("#healthBar").setAnimation(healts["healthBar75Y"]);
            }

        }else if(warrior.healt == 50){
            if(warrior.color == "blue"){
                $("#healthBar").setAnimation(healts["healthBar50B"]);
            }else if(warrior.color=="green"){
                $("#healthBar").setAnimation(healts["healthBar50G"]);
            }else if(warrior.color =="red"){
                $("#healthBar").setAnimation(healts["healthBar50R"]);
            }else if(warrior.color =="yellow"){
                $("#healthBar").setAnimation(healts["healthBar50Y"]);
            }
        }else if(warrior.healt == 25){
            if(warrior.color == "blue"){
                $("#healthBar").setAnimation(healts["healthBar25B"]);
            }else if(warrior.color=="green"){
                $("#healthBar").setAnimation(healts["healthBar25G"]);
            }else if(warrior.color =="red"){
                $("#healthBar").setAnimation(healts["healthBar25R"]);
            }else if(warrior.color =="yellow"){
                $("#healthBar").setAnimation(healts["healthBar25Y"]);
            }
        }else{
            
        }
};
$(function () {

    //Animation declaration

    //Background Map

    var background3 = new $.gQ.Animation({imageURL:"./js/bg/background.png"});
    healts["healthBarY"] = new $.gQ.Animation({imageURL:"./js/player/lifeBarY.png"});         
    healts["healthBarB"] = new $.gQ.Animation({imageURL:"./js/player/lifeBarB.png"});         
    healts["healthBarG"] = new $.gQ.Animation({imageURL:"./js/player/lifeBarG.png"});         
    healts["healthBarR"] = new $.gQ.Animation({imageURL:"./js/player/lifeBarR.png"}); 
    healts["healthBar75Y"] = new $.gQ.Animation({imageURL:"./js/player/lifeBar75Y.png"});         
    healts["healthBar75B"] = new $.gQ.Animation({imageURL:"./js/player/lifeBar75B.png"});         
    healts["healthBar75G"] = new $.gQ.Animation({imageURL:"./js/player/lifeBar75G.png"});         
    healts["healthBar75R"] = new $.gQ.Animation({imageURL:"./js/player/lifeBar75R.png"});
    healts["healthBar50Y"] = new $.gQ.Animation({imageURL:"./js/player/lifeBar50Y.png"});         
    healts["healthBar50B"] = new $.gQ.Animation({imageURL:"./js/player/lifeBar50B.png"});         
    healts["healthBar50G"] = new $.gQ.Animation({imageURL:"./js/player/lifeBar50G.png"});         
    healts["healthBar50R"] = new $.gQ.Animation({imageURL:"./js/player/lifeBar50R.png"});
    healts["healthBar25Y"] = new $.gQ.Animation({imageURL:"./js/player/lifeBar25Y.png"});         
    healts["healthBar25B"] = new $.gQ.Animation({imageURL:"./js/player/lifeBar25B.png"});         
    healts["healthBar25G"] = new $.gQ.Animation({imageURL:"./js/player/lifeBar25G.png"});         
    healts["healthBar25R"] = new $.gQ.Animation({imageURL:"./js/player/lifeBar25R.png"});
    //bullets
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

    //Initialize the game
    $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})
            .addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
            .addGroup("players", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
            .addGroup("zoombies", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
            .addGroup("bullets",{width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end();

    //Intialize the background


    $("#background").addSprite("background3", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT, animation: background3});

    $.playground().registerCallback(function(){
        if(!gameOver){
            $(".playerBullets").each(function(){
					var posx = $(this).x();
                                        var posy = $(this).y();
					if(posx > PLAYGROUND_WIDTH ||posy > PLAYGROUND_HEIGHT){
						$(this).remove();
						return;
					}                                        
                                        var conta = 0;
                                        for(key in bulletsD){                                            
                                            if(key === this.id){
                                                if (bulletsD[key] == "left") {                                                       
                                                    $(this).x(BULLET_SPEED * -1, true);
                                                } else if (bulletsD[key] == "right") {
                                                    $(this).x(BULLET_SPEED, true);
                                                } else if (bulletsD[key] == "up") {
                                                    $(this).y(BULLET_SPEED * -1, true);
                                                } else {
                                                    $(this).y(BULLET_SPEED, true);
                                                }
                                                //app.updateSpecificBullet(conta,$(this).x(), $(this).y());
                                                app.updateBullet($(this).x(), $(this).y());
                                            }                                               
                                            conta++;                                            
                                        }
                                        
                                        
                                        

                                        
					//$(this).x(BULLET_SPEED, true);
					//Test for collisions
					var collided ;
                                        for (i = 0; i < playersNames.length; i++ ){
                                            collided = $(this).collision("#players,#"+playersNames[i]); 
                                            if(collided.length > 0){
                                                for(j=0; j < warriors.length; j++){
                                                    if(warriors[j].name == playersNames[i]){
                                                        app.updateSpecificPlayer(warriors[j].x,warriors[j].y, warriors[j].status, -25, j );
                                                        updateHealth(warriors[j]);
                                                        $(this).remove();
                                                    }
                                                }
                                                
                                            }
                                        }
                                        
            });
        }


    }, REFRESH_RATE);

    
    $("#start").click(function () {
        
        playerName = $('#idName').val();
        $.playground().startGame(function () {           
            app.init($('#idGame').val());
            aviableGames.push($('#idGame').val());
            var ctrl = document.selectorColor.radio;
            for (i = 0; i < ctrl.length; i++) {
                if (ctrl[i].checked) {
                    var color = ctrl[i].value;
                }
            }                             
            $("#index").remove();
            setTimeout(function (){
                app.publishPlayer(70,60,color,playerName,"idle");
                if(color == "blue"){
                    $("#players").addSprite("healthBar",{width:560, height:138, animation:healts["healthBarB"], posx:50,posy:0});
                }else if(color=="green"){
                    $("#players").addSprite("healthBar",{width:560, height:138, animation:healts["healthBarG"], posx:50,posy:0});
                }else if(color =="red"){
                    $("#players").addSprite("healthBar",{width:560, height:138, animation:healts["healthBarR"], posx:50,posy:0});
                }else if(color =="yellow"){
                    $("#players").addSprite("healthBar",{width:560, height:138, animation:healts["healthBarY"], posx:50,posy:0});
                }
           },800);
        });
    });
    
    $(document).keydown(function(e){
        if(alReady){
            var playerposx = $("#"+playerName).x();
            var playerposy = $("#"+playerName).y();
            switch(e.keyCode){
                case 32: //this is shoot (space)
                    bulletCounter = (bulletCounter + 1) % 100000;
                    var name = "playerBullet_"+bulletCounter;                    
                    if(warrior.status == "left"){                        
                        $("#bullets").addSprite(name,{width:47,height:47, animation:bullets["bulletL"], posx:playerposx-50,posy:playerposy});                     
                        $("#"+name).addClass("playerBullets");
                        app.publishBullet(name,playerposx-50,playerposy);
                    }else if(warrior.status == "right"){
                        $("#bullets").addSprite(name,{width:47,height:47, animation:bullets["bulletR"], posx:playerposx+60,posy:playerposy});
                        $("#"+name).addClass("playerBullets");
                        app.publishBullet(name,playerposx+60,playerposy);
                    }else if(warrior.status == "up"){
                        $("#bullets").addSprite(name,{width:47,height:47, animation:bullets["bulletU"], posx:playerposx,posy:playerposy-50});
                        $("#"+name).addClass("playerBullets");
                        app.publishBullet(name,playerposx,playerposy-50);
                    }else{
                        $("#bullets").addSprite(name,{width:47,height:47, animation:bullets["bulletD"], posx:playerposx,posy:playerposy+50});
                        $("#"+name).addClass("playerBullets");
                        app.publishBullet(name,playerposx,playerposy+50);
                    }
                    bulletsD[name] = warrior.status;    
                    break;
                case 37: //this is left! (left arrow)
                    app.updatePlayer(playerposx - 10, playerposy, "left", warrior.healt);
                    
                    break;
                case 38: //this is up! (up arrow)
                    app.updatePlayer(playerposx, playerposy - 10, "up", warrior.healt);
                    break;
                case 39: //this is right (right arrow)
                    app.updatePlayer(playerposx + 10, playerposy, "right", warrior.healt);
                    break;
                case 40: //this is down! (down arrow)
                    app.updatePlayer(playerposx, playerposy + 10, "down", warrior.healt);
                    break;
            }
        }
    });


});
