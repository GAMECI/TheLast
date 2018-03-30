
var PLAYGROUND_HEIGHT= 2000;
var PLAYGROUND_WIDTH = 2000;
var playerName;
var playerAnimation= new Array();
var alReady=false;


var addPlayer= function(event){
    if($("#"+event.name).val()!=undefined)
        $("#"+event.name).remove();
    $("#players").addSprite(event.name,{width:53,height:39,animation:playerAnimation["idle"],posx:event.x, posy:event.y});
    alReady=true;
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

    //Initialize the game
    $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})
        .addGroup("background",{width: PLAYGROUND_WIDTH, height:PLAYGROUND_HEIGHT}).end()
        .addGroup("players",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT}).end()
        .addGroup("zoombies",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT});

    //Intialize the background

    $("#background").addSprite("background3",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT,animation:background3});



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
                    app.publishPlayer(70,60,color,playerName);
                },500);
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
                    $("#"+playerName).remove();
                    $("#players").addSprite(playerName,{width:53,height:39,animation:playerAnimation["left"],posx:playerposx-10,posy:playerposy});
                    break;
                case 38: //this is up! (up arrow)
                    $("#"+playerName).remove();
                    $("#players").addSprite(playerName,{width:39,height:53,animation:playerAnimation["up"],posx:playerposx,posy:playerposy-10});
                    break;
                case 39: //this is right (right arrow)
                    $("#"+playerName).remove();
                    $("#players").addSprite(playerName,{width:53,height:39,animation:playerAnimation["right"],posx:playerposx+10,posy:playerposy});
                    break;
                case 40: //this is down! (down arrow)
                    $("#"+playerName).remove();
                    $("#players").addSprite(playerName,{width:39,height:53,animation:playerAnimation["down"],posx:playerposx,posy:playerposy+10});
                    break;
            }
        }   
    });


});
