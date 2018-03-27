/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.stompController;

import com.gameci.thelast.logic.Map;
import com.gameci.thelast.logic.Warrior;
import com.gameci.thelast.services.GameServicesStub;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

/**
 *
 * @author andres
 */
@Controller
public class stompController {
    @Autowired
    SimpMessagingTemplate msgt;
    
    GameServicesStub gss = new  GameServicesStub();
    
    @MessageMapping("/player.{idGame}")
    public void handlePlayerEvent(Warrior warrior,@DestinationVariable int idGame){
        System.out.println(warrior.toString());
        Map game=gss.getMap(idGame);
        if(game==null)
            gss.createNewMap(idGame);
        gss.addNewWarriorToMap(warrior, idGame);
        msgt.convertAndSend("/topic/player."+idGame,warrior);
        
    }
}


