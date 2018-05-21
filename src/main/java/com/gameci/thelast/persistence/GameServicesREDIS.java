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
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Response;
import redis.clients.jedis.Transaction;

/**
 *
 * @author andres
 */
@Service            
public class GameServicesREDIS implements GameServices{
    private Jedis jedis;

    

@Autowired
private StringRedisTemplate template;    
    
    
    @Override
    public void createNewMap(int idGame) throws GameServicesException {
        template.opsForSet().add("games",String.valueOf(idGame));
    }

    @Override
    public void addNewWarriorToMap(Warrior warrior, int idGame) throws GameServicesException {
        template.opsForSet().add("W:"+String.valueOf(idGame),warrior.getName());
        template.opsForSet().add("XY:"+warrior.getName(),"x:"+warrior.getX()+",y:"+warrior.getY());
        template.opsForSet().add("SC:"+warrior.getName(),"status:"+warrior.getStatus()+",color:"+warrior.getColor());
        template.opsForSet().add("HA:"+warrior.getName(),"healt:"+warrior.getHealt()+",ammo:"+warrior.getAmmo());
    }
    
    @Override
    public void removeWarriorOfMap(String warriorName, int idGame) throws GameServicesException {
        if(template.hasKey("W:"+String.valueOf(idGame))){
                if(template.opsForSet().isMember(String.valueOf(idGame),warriorName)){
                    template.opsForSet().remove(String.valueOf(idGame),warriorName);
                }
        }
    }

    @Override
    public void updateWarrior(Warrior warrior, int idGame) throws GameServicesException {
        removeWarriorOfMap(warrior.getName(),idGame);
        addNewWarriorToMap(warrior,idGame);
    }

    @Override
    public Map getMap(int idGame) throws GameServicesException {
        Map map = new Map(idGame);
        Set<String> warriors=template.opsForSet().members("W:"+String.valueOf(idGame));
        Set<String> zombies=template.opsForSet().members("Z:"+String.valueOf(idGame));
        Set<String> objects=template.opsForSet().members("O:"+String.valueOf(idGame));
        //String time=template.opsForHash().put(h, map, map)
        //ConcurrentHashMap<String, Warrior> warriors;
        //ConcurrentHashMap<String, Zombie> zombies;
        //ConcurrentHashMap<Integer, SpecialObject> objects;
        long initialTime;
        long finalTime;
        template.opsForSet().members(String.valueOf(idGame));
        return map;
    }

    @Override
    public void addNewZombieToMap(Zombie zombie, int idGame) throws GameServicesException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void updateZombie(Zombie zombie, int idGame) throws GameServicesException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void putSpecialObjectInMap(int idGame, SpecialObject object) throws GameServicesException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void removeSpecialObjectsToMap(int idGame) throws GameServicesException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
