




var PLAYGROUND_HEIGHT= 2000;
var PLAYGROUND_WIDTH = 2000;


$(function(){
    var background3 = new $.gQ.Animation({imageURL:"./js/bg/background.png"});

    $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})
        .addGroup("background",{width: PLAYGROUND_WIDTH, height:PLAYGROUND_HEIGHT}).end()
        .addGroup("players",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT}).end()
        .addGroup("obstacles",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT}).end()
        .addGroup("zoombies",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT});

    $("#background").addSprite("background3",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT,animation:background3});

    $("#start").click(function () {
            $.playground().startGame(function () {
                $("#start").remove();
            })
    });

});

