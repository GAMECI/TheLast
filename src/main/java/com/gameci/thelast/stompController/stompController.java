/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.stompController;

import com.gameci.thelast.logic.Map;
import com.gameci.thelast.logic.Warrior;
import com.gameci.thelast.services.GameServicesStub;
import java.util.Collection;
import java.util.Random;
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
    
    private GameServicesStub gss = new  GameServicesStub();
    private Warrior warrior;
    private int idGame;
    
    
    @MessageMapping("/player.{idGame}")
    public void handlePlayerEvent(Warrior warrior,@DestinationVariable int idGame){
        boolean first=false;
        this.warrior=warrior;
        this.idGame=idGame;
        Map game=gss.getMap(idGame);
        if(game==null){
            gss.createNewMap(idGame);
            game=gss.getMap(idGame);
            first=true;
        }
        if(game.containsWarrior(warrior.getName())){
            updateWarrior();
        }else{
            addNewWarrior(first);
        }        
        System.out.println(warrior.toString());
        msgt.convertAndSend("/topic/player."+idGame,warrior);
    }
    
    
    
    
    public void loadWarriors(int idGame, Map game){
        if(game!=null){
            Collection<Warrior> values = game.getWarriors();
            synchronized(values){
                for(Warrior i:game.getWarriors()){
                    msgt.convertAndSend("/topic/player."+idGame,i);
                }
            }
        }
    }
    
    public void addNewWarrior(boolean first){
        boolean possible=false;
        Random rm =  new Random();
        Map game=gss.getMap(idGame);
        int minVal =60;
        int maxVal =200;
        int newX=minVal;
        int newY=minVal;
        if(!first){
            loadWarriors(idGame,game);
            Collection<Warrior> values = game.getWarriors();
                synchronized(values){
                    while(!possible){
                        boolean breakLoop=false;
                        newX=rm.nextInt(maxVal)+minVal;
                        newY=rm.nextInt(maxVal)+minVal;
                        for(Warrior i:values){
                            if(i.getX()==newX && i.getY()==newY){
                                breakLoop=true;
                                break;
                            }        
                        }
                        if(!breakLoop)
                            possible=true;
                    }
                }
                warrior.setX(newX);
                warrior.setY(newY);
                first=true;
        }
        gss.addNewWarriorToMap(warrior, idGame);
    }
    
    public void updateWarrior(){
        gss.updateWarrior(warrior, idGame);
    }
    
         
}


