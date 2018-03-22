var app = (function () {


    var stompClient = null;




    var connectAndSubscribe = function () {
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);

        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/player', function (event) {
                //alert("nuevo jugador");
            });
        });

    };



    return {

        init: function () {
            //websocket connection
            connectAndSubscribe();
        },

        publishPlayer: function(event){
            stompClient.send("/topic/player",{},event);
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