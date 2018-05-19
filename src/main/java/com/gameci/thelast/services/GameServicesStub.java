/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.services;

import com.gameci.thelast.logic.Bullet;
import com.gameci.thelast.logic.Map;
import com.gameci.thelast.logic.SpecialObject;
import com.gameci.thelast.logic.Warrior;
import com.gameci.thelast.logic.Zombie;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author andres
 */
public class GameServicesStub implements GameServices {

    private ConcurrentHashMap<Integer, Map> games;
    private GameServicesStub gss;

    public GameServicesStub() {
        games = new ConcurrentHashMap<>();
    }
    public ConcurrentHashMap<Integer, Map> getAviableGames(){
        return games;
    }
    @Override
    public void createNewMap(int idGame) {
        if (!games.containsKey(idGame)) {
            games.put(idGame, new Map(idGame));
        }
    }
    @Override
    public void addBulletToMap(Bullet bullet, int idGame) throws GameServicesException {
        if (games.containsKey(idGame)) {
            Map actualMap = games.get(idGame);
            if (!actualMap.containsBullet(bullet.getId())) {
                actualMap.addBullet(bullet);
            } else {
                throw new GameServicesException("The bullet id  already exists in the same game");
            }
        }

    }
     @Override
    public void updateBullet(Bullet bullet, int idGame) throws GameServicesException {
        if (games.containsKey(idGame)) {
            Map actualMap = games.get(idGame);
            if (actualMap.containsBullet(bullet.getId())) {
                actualMap.getBullet(bullet.getId()).setX(bullet.getX());
                actualMap.getBullet(bullet.getId()).setY(bullet.getY());
            } else {
                throw new GameServicesException("The bullet doesn't exist in the same game");
            }
        }
    }
    @Override
    public void updateWarrior(Warrior warrior, int idGame) throws GameServicesException {
        if (games.containsKey(idGame)) {
            Map actualMap = games.get(idGame);
            if (actualMap.containsWarrior(warrior.getName())) {
                actualMap.getWarrior(warrior.getName()).setHealt(warrior.getHealt());
                actualMap.getWarrior(warrior.getName()).setScore(warrior.getScore());
                actualMap.getWarrior(warrior.getName()).setX(warrior.getX());
                actualMap.getWarrior(warrior.getName()).setY(warrior.getY());
                actualMap.getWarrior(warrior.getName()).setStatus(warrior.getStatus());
            } else {
                throw new GameServicesException("The player's name already exists in the same game");
            }
        }
    }
    @Override
    public void addNewWarriorToMap(Warrior warrior, int idGame) throws GameServicesException {
        if (games.containsKey(idGame)) {
            Map actualMap = games.get(idGame);
            if (!actualMap.containsWarrior(warrior.getName())) {
                games.get(idGame).addWarrior(warrior);
            } else {
                System.out.println("estaaaes" + warrior.getName());
                throw new GameServicesException("The player's name already exists in the same game");
            }
        }

    }

   
    @Override
    public Map getMap(int idGame) {
        Map game = null;
        if (games.containsKey(idGame)) {
            game = games.get(idGame);
        }
        return game;

    }    
    
    public void putSpecialObjectInMap(int idGame, SpecialObject object) {
        if (games.containsKey(idGame)) {
            games.get(idGame).addSpecialObject(object);
        }
    }

    public void addNewZombieToMap(Zombie zombie, int idGame) {
        if (games.containsKey(idGame)) {
            Map actualMap = games.get(idGame);
            if (!actualMap.containsWarrior(zombie.getId())) {
                games.get(idGame).addZombie(zombie);
            }
        }
    }

    public void updateZombie(Zombie zombie, int idGame) {
        if (games.containsKey(idGame)) {
            Map actualMap = games.get(idGame);
            if (actualMap.containsZombie(zombie.getId())) {
                actualMap.getZombie(zombie.getId()).setId(zombie.getId());
                actualMap.getZombie(zombie.getId()).setHealt(zombie.getHealt());
                actualMap.getZombie(zombie.getId()).setPosx(zombie.getPosx());
                actualMap.getZombie(zombie.getId()).setPosy(zombie.getPosy());
            }
        }
    }

    public void removeSpecialObjectsToMap(int idGame) {
        if (games.containsKey(idGame)) {
            games.get(idGame).removeSpecialObjects();
        }
    }
}
