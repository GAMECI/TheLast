




var PLAYGROUND_HEIGHT= 2000;
var PLAYGROUND_WIDTH = 2000;
var playerAnimation= new Array();


var addPlayer= function(event){
    $("#players").addSprite("player2",event);
};

$(function(){

    //Animation declaration

    //Background Map
    var background3 = new $.gQ.Animation({imageURL:"./js/bg/background.png"});

    //Player

    playerAnimation["idle"]=new $.gQ.Animation({imageURL:"./js/player/survivor-idle_handgun_0.png"})


    //Initialize the game
    $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})
        .addGroup("background",{width: PLAYGROUND_WIDTH, height:PLAYGROUND_HEIGHT}).end()
        .addGroup("players",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT}).end()
        .addGroup("obstacles",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT}).end()
        .addGroup("zoombies",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT});

    //Intialize the background

    $("#background").addSprite("background3",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT,animation:background3});
    $("#players").addSprite("player",{width:53,height:39,animation:playerAnimation["idle"],posx:60, posy:60})



    $("#start").click(function () {
            $.playground().startGame(function () {
                $("#index").remove();
                app.publishPlayer({width:53,height:39,animation:playerAnimation["idle"],posx:60, posy:60});
            })
    });

});

