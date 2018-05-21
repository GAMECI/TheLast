/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.stompController;

import com.gameci.thelast.logic.Map;
import com.gameci.thelast.logic.SpecialObject;
import com.gameci.thelast.logic.Warrior;

import com.gameci.thelast.logic.Zombie;
import com.gameci.thelast.persistence.GameServices;
import com.gameci.thelast.persistence.GameServicesException;
import com.gameci.thelast.persistence.GameServicesMemory;
import java.util.Collection;
import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
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
    
    @Autowired
    private GameServices gss;
    
    private AtomicInteger objectInstance = new AtomicInteger();
    private boolean enable = true;
    private final static int MINVALX=35;
    private final static int MINVALY=175;
    private final static int MAXVALX=1445;
    private final static int MAXVALY=751;

    @MessageMapping("/player.{idGame}")
    public void handlePlayerEvent(Warrior warrior, @DestinationVariable int idGame) throws GameServicesException {
        boolean first = false;
        synchronized (gss) {
            Map game = gss.getMap(idGame);
            if (game == null) {
                gss.createNewMap(idGame);
                first = true;
            }
        }
        try {
            if (warrior.getStatus().equals("idle")) {

                addNewWarrior(first, warrior, idGame);

            } else {
                updateWarrior(warrior, idGame);
            }

            System.out.println(warrior.toString());
            msgt.convertAndSend("/topic/player." + idGame, warrior);
        } catch (GameServicesException e) {
            //msgt.convertAndSend("/topic/player." + idGame,"{\"ERROR\":\""+e.getMessage()+"\"}");
        }
    }

    @MessageMapping("/zombie.{idGame}")
    public void handleZombieEvent(Zombie zombie, @DestinationVariable int idGame) throws GameServicesException {
        boolean first = false;
        synchronized (gss) {
            Map game = gss.getMap(idGame);
            if (game == null) {
                gss.createNewMap(idGame);
                game = gss.getMap(idGame);
                first = true;
            }
        }
        try {
            if (zombie.getStatus().equals("idle")) {
                synchronized (gss) {
                    addNewZombie(first, zombie, idGame);
                }
            } else {
                updateZombie(zombie, idGame);
            }
            System.out.println(zombie.toString());
            msgt.convertAndSend("/topic/zombie." + idGame, zombie);
        } catch (GameServicesException e) {

        }
    }

    public void loadWarriors(int idGame, Map game) {
        if (game != null) {

            Collection<Warrior> values = game.getWarriors();
            synchronized (gss) {
                for (Warrior i : game.getWarriors()) {
                    msgt.convertAndSend("/topic/player." + idGame, i);
                }
            }
        }
    }

    public void addNewWarrior(boolean first, Warrior warrior, int idGame) throws GameServicesException {
        Map game = gss.getMap(idGame);
        if (!first) {
            loadWarriors(idGame, game);
            int[] positions = posCalculator(idGame);
            warrior.setX(positions[0]);
            warrior.setY(positions[1]);
        }
        gss.addNewWarriorToMap(warrior, idGame);
    }

    public void updateWarrior(Warrior warrior, int idGame) throws GameServicesException {
        addSpecialObject(idGame);
        gss.updateWarrior(warrior, idGame);
    }

    public void updateZombie(Zombie zombie, int idGame) throws GameServicesException {
        gss.updateZombie(zombie, idGame);
    }

    public void addNewZombie(boolean first, Zombie zombie, int idGame) throws GameServicesException {
        Map game = gss.getMap(idGame);
        if (!first) {
            loadZombies(idGame, game);
            int[] positions = posCalculator(idGame);
            zombie.setPosx(positions[0]);
            zombie.setPosy(positions[1]);
        }
        gss.addNewZombieToMap(zombie, idGame);
    }

    public void loadZombies(int idGame, Map game) {
        if (game != null) {
            Collection<Zombie> values = game.getZombies();
            synchronized (values) {
                for (Zombie i : game.getZombies()) {
                    msgt.convertAndSend("/topic/zombie." + idGame, i);
                }
            }
        }
    }

    public void addSpecialObject(int idGame) throws GameServicesException {
        double deltaTime = (System.currentTimeMillis() - gss.getMap(idGame).getInitalTime()) / 60000.0;
        Random rm = new Random();
        int typeOfObject=rm.nextInt(2);
        String[] types = {"medicine","ammo"};
        if (deltaTime >= 1) {
            if((int)deltaTime%2!=0 && enable){
                int[] positions = posCalculator(idGame);
                SpecialObject object = new SpecialObject(positions[0], positions[1], types[typeOfObject], objectInstance.get());
                gss.putSpecialObjectInMap(idGame, object);
                System.out.println(object.toString());
                msgt.convertAndSend("/topic/object." + idGame, object);
                enable=false;
            }else if((int)deltaTime%2==0){
                enable=true;
            }
        }

    }

    public int[] posCalculator(int idGame) throws GameServicesException {
        int[] positions = new int[2];
        Random rm = new Random();
        positions[0] = MINVALX;
        positions[1] = MINVALY;
        boolean possible = false;
        synchronized (gss) {
            while (!possible) {
                boolean breakLoop = false;
                positions[0] = rm.nextInt(MAXVALX-MINVALX) + MINVALX;
                positions[1] = rm.nextInt(MAXVALY-MINVALY) + MINVALY;
                Map game = gss.getMap(idGame);
                Collection<Warrior> values = game.getWarriors();    
                for (Warrior i : values) {
                    if (i.getX() == positions[0] && i.getY() == positions[1]) {
                        breakLoop = true;
                        break;
                    }
                }
                if (!breakLoop) {
                    possible = true;
                }
            }
        }
        return positions;
    }

}
