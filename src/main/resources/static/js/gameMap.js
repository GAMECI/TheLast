
var PLAYGROUND_HEIGHT = 2000;
var PLAYGROUND_WIDTH = 2000;
var BULLET_SPEED =  10;
var bullets = new Array();
var playerName;
var playerAnimation = new Array();
var alReady = false;


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

$(function () {

    //Animation declaration

    //Background Map

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

    //Initialize the game
    $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})
            .addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
            .addGroup("players", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()
            .addGroup("zoombies", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT});

    //Intialize the background


    $("#background").addSprite("background3", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT, animation: background3});




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
                if(color == "blue"){
                    $("#players").addSprite("healthBarB",{width:560, height:138, animation:healthBarB, posx:50,posy:0});
                }else if(color=="green"){
                    $("#players").addSprite("healthBarG",{width:560, height:138, animation:healthBarG, posx:50,posy:0});
                }else if(color =="red"){
                    $("#players").addSprite("healthBarR",{width:560, height:138, animation:healthBarR, posx:50,posy:0});
                }else if(color =="yellow"){
                    $("#players").addSprite("healthBarY",{width:560, height:138, animation:healthBarY, posx:50,posy:0});
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
