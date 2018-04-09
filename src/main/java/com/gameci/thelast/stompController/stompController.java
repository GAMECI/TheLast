/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.stompController;

import com.gameci.thelast.logic.Map;
import com.gameci.thelast.logic.SpecialObject;
import com.gameci.thelast.logic.Warrior;
import com.gameci.thelast.services.GameServicesException;
import com.gameci.thelast.services.GameServicesStub;
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

    private GameServicesStub gss = new GameServicesStub();
    private AtomicInteger objectInstance = new AtomicInteger();

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
        boolean possible = false;
        Random rm = new Random();
        Map game = gss.getMap(idGame);
        int minVal = 60;
        int maxVal = 200;
        int newX = minVal;
        int newY = minVal;
        if (!first) {
            loadWarriors(idGame, game);
            int[] positions = posCalculator(idGame);

            warrior.setX(positions[0]);
            warrior.setY(positions[1]);
            first = true;
        }

        gss.addNewWarriorToMap(warrior, idGame);
    }

    public void updateWarrior(Warrior warrior, int idGame) throws GameServicesException {
        addSpecialObject(idGame);
        gss.updateWarrior(warrior, idGame);
    }

    public void addSpecialObject(int idGame) {
        double deltaTime = (System.currentTimeMillis() - gss.getMap(idGame).getInitalTime()) / 60000.0;
        int minVal = 60;
        int maxVal = 200;
        Random rm = new Random();
        int newX = minVal;
        int newY = minVal;
        boolean possible = false;
        if (deltaTime >= objectInstance.get() + 1) {
            int[] positions = posCalculator(idGame);
            objectInstance.getAndAdd(1);
            SpecialObject object = new SpecialObject(positions[0], positions[1], "medicine", objectInstance.get());
            gss.putSpecialObjectInMap(idGame, object);
            msgt.convertAndSend("/topic/object." + idGame, object);
        }

    }

    public int[] posCalculator(int idGame) {
        int[] positions = new int[2];
        int minVal = 60;
        int maxVal = 200;
        Random rm = new Random();
        positions[0] = minVal;
        positions[1] = minVal;
        boolean possible = false;
        synchronized (gss) {
            while (!possible) {
                boolean breakLoop = false;
                positions[0] = rm.nextInt(maxVal) + minVal;
                positions[1] = rm.nextInt(maxVal) + minVal;
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
