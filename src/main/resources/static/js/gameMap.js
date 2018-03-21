




var PLAYGROUND_HEIGHT= 2000;
var PLAYGROUND_WIDTH = 2000;


$(function(){
    var background3 = new $.gQ.Animation({imageURL:"./js/bg/background.png"});

        playerAnimation["up] = new $.gameQuery.Animation({imageURL: "js/character/shooterUp.png", numberOfFrame: 6, delta: 14, rate: 60, type: $.gameQuery.ANIMATION_VERTICAL});});
        playerAnimation["down"] = new $.gameQuery.Animation({imageURL: "js/character/shooterDown.png", numberOfFrame: 6, delta: 14, rate: 60, type: $.gameQuery.ANIMATION_VERTICAL});});
        playerAnimation["left"] = new $.gameQuery.Animation({imageURL: "js/character/shooterLeft.png", numberOfFrame: 6, delta: 14, rate: 60, type: $.gameQuery.ANIMATION_HORIZONTAL});
        playerAnimation["right"] = new $.gameQuery.Animation({imageURL: "js/character/shooterRight.png", numberOfFrame: 6, delta: 14, rate: 60, type: $.gameQuery.ANIMATION_HORIZONTAL});        
                

    $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})
        .addGroup("background",{width: PLAYGROUND_WIDTH, height:PLAYGROUND_HEIGHT}).end()
        .addGroup("players",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT}).end()
        .addGroup("player", {posx: PLAYGROUND_WIDTH/2, posy: PLAYGROUND_HEIGHT/2, width: 100, height: 26})
        .addSprite("playerUp",{animation: playerAnimation["up"], posx: 0, posy: 0, width: 100, height: 26})
        .addSprite("playerDown",{animation: playerAnimation["down"], posx: 0, posy: 0, width: 100, height: 26})
        .addSprite("playerLeft",{animation: playerAnimation["left"], posx: 0, posy: 0, width: 100, height: 26})
        .addSprite("playerRight",{animation: playerAnimation["right"], posx: 0, posy: 0, width: 100, height: 26})
        .addGroup("obstacles",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT}).end()
        .addGroup("zoombies",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT});

    $("#background").addSprite("background3",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT,animation:background3});

    $("#start").click(function () {
            $.playground().startGame(function () {
                $("#start").remove();
            })
    });

});

$(document).keydown(function(e){
          switch(e.keyCode){
            $("#player").setAnimation(playerAnimation["up"]);
            if(e.keyCode== "w"){
                $("#player").setAnimation(playerAnimation["up"]);
                $("#player").y(10,true);
            }
            else if(e.keyCode== "s"){
                $("#player").setAnimation(playerAnimation["down"]);
                $("#player").y(-10,true);
            }
            else if(e.keyCode== "a"){
                $("#player").setAnimation(playerAnimation["left"]);
                $("#player").x(-10,true);
            }
            else if(e.keyCode== "d"){
                $("#player").setAnimation(playerAnimation["right"]);
                $("#player").x(10,true);
            }
          }
});