/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.persistence;

import com.gameci.thelast.logic.Map;
import com.gameci.thelast.logic.SpecialObject;
import com.gameci.thelast.logic.Warrior;
import com.gameci.thelast.logic.Zombie;
import java.util.ArrayList;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 *
 * @author andres
 */
@Service
public class GameServicesREDIS implements GameServices {

    @Autowired
    private StringRedisTemplate template;

    @Override
    public void createNewMap(int idGame) throws GameServicesException {
        template.opsForSet().add("games", String.valueOf(idGame));
        Map map = new Map(idGame);
        template.opsForHash().put(String.valueOf(idGame), "time", String.valueOf(map.getInitalTime()));
    }

    @Override
    public void addNewWarriorToMap(Warrior warrior, int idGame) throws GameServicesException {
        template.opsForSet().add("W:" + String.valueOf(idGame), warrior.getName());
        template.opsForHash().put(warrior.getName(), "information", warrior.getHealt() + "," + warrior.getColor() + "," + warrior.getScore() + "," + warrior.getX() + "," + warrior.getY() + "," + warrior.getStatus() + "," + warrior.getAmmo());
    }

    @Override
    public void removeWarriorOfMap(String warriorName, int idGame) throws GameServicesException {
        if (template.hasKey("W:" + String.valueOf(idGame))) {
            if (template.opsForSet().isMember("W:"+String.valueOf(idGame), warriorName)) {
                template.opsForSet().remove("W:"+String.valueOf(idGame), warriorName);
            }
        }
    }

    @Override
    public void updateWarrior(Warrior warrior, int idGame) throws GameServicesException {
        removeWarriorOfMap(warrior.getName(), idGame);
        addNewWarriorToMap(warrior, idGame);
    }

    @Override
    public Map getMap(int idGame) throws GameServicesException {
        Map map = null;

        if (template.opsForSet().isMember("games", String.valueOf(idGame))) {
            map= new Map(idGame);
            //Warrior
            Set<String> warriors = template.opsForSet().members("W:" + String.valueOf(idGame));
            ConcurrentHashMap<String, Warrior> warriorsHashMap = new ConcurrentHashMap<>();
            for (String i : warriors) {
                String[] information = ((String) template.opsForHash().get(i, "information")).split(",");
                Warrior warrior = new Warrior(i, Integer.valueOf(information[0]), information[1], Integer.valueOf(information[2]), Integer.valueOf(information[3]), Integer.valueOf(information[4]), information[5], Integer.valueOf(information[6]));
                map.addWarrior(warrior);
            }
            //Zombies
            Set<String> zombies = template.opsForSet().members("Z:" + String.valueOf(idGame));
            ConcurrentHashMap<String, Zombie> zombiesHashMap = new ConcurrentHashMap<>();
            for (String i : zombies) {
                String[] information = ((String) template.opsForHash().get(i, "information")).split(",");
                Zombie zombie = new Zombie(Integer.valueOf(information[0]), Integer.valueOf(information[1]), Integer.valueOf(information[2]),i, information[3]);
                map.addZombie(zombie);
            }
            //Object
            Set<String> objects = template.opsForSet().members("O:" + String.valueOf(idGame));
            ConcurrentHashMap<String, SpecialObject> objectsHashMap = new ConcurrentHashMap<>();
            for (String i : objects) {
                String[] information = ((String) template.opsForHash().get(i, "information")).split(",");
                SpecialObject object = new SpecialObject(Integer.valueOf(information[0]), Integer.valueOf(information[1]), information[2], Integer.valueOf(i));
                map.addSpecialObject(object);
            }
            //Time
            String time = (String) template.opsForHash().get(String.valueOf(idGame), "time");
            map.setInitialTime(Long.valueOf(time));
        }

        return map;
    }

    @Override
    public void addNewZombieToMap(Zombie zombie, int idGame) throws GameServicesException {
        template.opsForSet().add("Z:" + String.valueOf(idGame), zombie.getId());
        template.opsForHash().put(zombie.getId(), "information", zombie.getHealt() + "," + zombie.getPosx() + "," + zombie.getPosy() + "," + zombie.getStatus());
    }

    @Override
    public void updateZombie(Zombie zombie, int idGame) throws GameServicesException {
        if (template.hasKey("Z:" + String.valueOf(idGame))) {
            if (template.opsForSet().isMember("Z:"+String.valueOf(idGame), zombie.getId())) {
                template.opsForSet().remove("Z:"+String.valueOf(idGame), zombie.getId());
            }
        }
        addNewZombieToMap(zombie, idGame);
    }

    @Override
    public void putSpecialObjectInMap(int idGame, SpecialObject object) throws GameServicesException {
        template.opsForSet().add("O:" + String.valueOf(idGame), String.valueOf(object.getId()));
        template.opsForHash().put(String.valueOf(object.getId()), "information", object.getPosx() + "," + object.getPosy() + "," + object.getType());
    }

    @Override
    public void removeSpecialObjectsToMap(int idGame) throws GameServicesException {
        if (template.hasKey("O:" + String.valueOf(idGame))) {
            template.opsForSet().pop("O:" + String.valueOf(idGame));
        }
    }

}
