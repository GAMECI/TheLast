/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.stompController;

import com.gameci.thelast.logic.Bullet;
import com.gameci.thelast.logic.Map;
import com.gameci.thelast.logic.Warrior;
import com.gameci.thelast.services.GameServicesException;
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

    private GameServicesStub gss = new GameServicesStub();
    
    @MessageMapping("/bullet.{idGame}")
    public void handleBullet(Bullet bullet, @DestinationVariable int idGame) throws GameServicesException{        
        try{
            synchronized(gss){
                Map game = gss.getMap(idGame);
                if (game == null) {
                    gss.createNewMap(idGame);
                    game = gss.getMap(idGame);
                }
                Collection<Bullet> values = game.getBullets();               
                if(values.contains(bullet)){
                    updateBullet(bullet, idGame);
                }else{
                    addNewBullet(bullet, idGame);
                }                
                msgt.convertAndSend("/topic/bullet." + idGame, bullet);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
    
    }
    
    @MessageMapping("/player.{idGame}")
    public void handlePlayerEvent(Warrior warrior, @DestinationVariable int idGame) throws GameServicesException {
        boolean first = false;
        synchronized (gss) {
            Map game = gss.getMap(idGame);
            if (game == null) {
                System.out.println(game + warrior.getName());
                gss.createNewMap(idGame);
                game = gss.getMap(idGame);
                first = true;

            }
        }
        try {
            if (warrior.getStatus().equals("idle")) {
                synchronized (gss) {
                    addNewWarrior(first,warrior,idGame);
                }
            } else {
                updateWarrior(warrior,idGame);
            }

            System.out.println(warrior.toString());
            msgt.convertAndSend("/topic/player." + idGame, warrior);
        } catch (GameServicesException e) {
            //msgt.convertAndSend("/topic/player." + idGame,"{\"ERROR\":\""+e.getMessage()+"\"}");
        }
    }
    public void loadBullets(int idGame, Map game) {
        if (game != null) {
            Collection<Bullet> values = game.getBullets();
            synchronized (gss) {
                for (Bullet i : values) {
                    msgt.convertAndSend("/topic/bullet." + idGame, i);
                }
            }
        }
    }
    public void loadWarriors(int idGame, Map game) {
        if (game != null) {
            Collection<Warrior> values = game.getWarriors();
            synchronized (gss) {
                for (Warrior i : values) {
                    msgt.convertAndSend("/topic/player." + idGame, i);
                }
            }
        }
    }

    public void addNewWarrior(boolean first,Warrior warrior,int idGame) throws GameServicesException {
        boolean possible = false;
        Random rm = new Random();
        Map game = gss.getMap(idGame);
        int minVal = 60;
        int maxVal = 200;
        int newX = minVal;
        int newY = minVal;
        if (!first) {
            loadWarriors(idGame, game);
            while (!possible) {
                boolean breakLoop = false;
                newX = rm.nextInt(maxVal) + minVal;
                newY = rm.nextInt(maxVal) + minVal;

                Collection<Warrior> values = game.getWarriors();
                for (Warrior i : values) {
                    if (i.getX() == newX && i.getY() == newY) {
                        breakLoop = true;
                        break;
                    }
                }

                if (!breakLoop) {
                    possible = true;
                }
            }

            warrior.setX(newX);
            warrior.setY(newY);
            first = true;
        }

        gss.addNewWarriorToMap(warrior, idGame);
    }

    public void updateWarrior(Warrior warrior,int idGame) throws GameServicesException {
        Map game = gss.getMap(idGame);
        if(game!=null){
            gss.updateWarrior(warrior, idGame);
        }else{
            System.out.println("No se encontro la partida");
        }
        
    }

    private void addNewBullet(Bullet bullet, int idGame) throws GameServicesException{
        try{
            Map game = gss.getMap(idGame);
            loadBullets(idGame, game);
            gss.addBulletToMap(bullet, idGame);
        }catch(GameServicesException e){
            e.toString();
        }
    }
    
    private void updateBullet(Bullet bullet, int idGame) throws GameServicesException{
        try{
            Map game = gss.getMap(idGame);
            if(game!=null){
                gss.updateBullet(bullet, idGame);
            }else{
                System.out.println("No se encontro la partida");
            }
        }catch(GameServicesException e){
            e.toString();
        }
        
    }

}
