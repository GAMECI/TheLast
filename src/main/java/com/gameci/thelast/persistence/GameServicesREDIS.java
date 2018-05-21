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
        template.opsForHash().put(warrior.getName(),"information",warrior.getHealt()+","+warrior.getColor()+","+warrior.getScore()+","+warrior.getX()+","+warrior.getY()+","+warrior.getStatus()+","+warrior.getAmmo());      
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
        
        //Warrior
        Set<String> warriors=template.opsForSet().members("W:"+String.valueOf(idGame));
        ConcurrentHashMap<String,Warrior> warriorsHashMap=new ConcurrentHashMap<>();
        for(String i:warriors){
            String warriorName=i.substring(2);
            String[] information=((String) template.opsForHash().get(warriorName,"information")).split(",");
            Warrior warrior=new Warrior(warriorName,Integer.valueOf(information[0]),information[1],Integer.valueOf(information[2]),Integer.valueOf(information[3]),Integer.valueOf(information[4]),information[5],Integer.valueOf(information[6]));
            map.addWarrior(warrior);
        }
        //Zombies
        Set<String> zombies=template.opsForSet().members("Z:"+String.valueOf(idGame));
        ConcurrentHashMap<String,Zombie> zombiesHashMap=new ConcurrentHashMap<>();
        for(String i:zombies){
            String zombieId=i.substring(2);
            String[] information=((String) template.opsForHash().get(zombieId,"information")).split(",");
            Zombie zombie= new Zombie(Integer.valueOf(information[0]),Integer.valueOf(information[1]),Integer.valueOf(information[2]),zombieId,information[3]);
            map.addZombie(zombie);
        }
        //Object
        Set<String> objects=template.opsForSet().members("O:"+String.valueOf(idGame));
        ConcurrentHashMap<String,SpecialObject> objectsHashMap=new ConcurrentHashMap<>();
        for(String i:objects){
            String objectId=i.substring(2);
            String[] information=((String) template.opsForHash().get(objectId,"information")).split(",");
            SpecialObject object= new SpecialObject(Integer.valueOf(information[0]),Integer.valueOf(information[1]),information[2],Integer.valueOf(objectId));
            map.addSpecialObject(object);
        }
        //Time
        String time=(String)template.opsForHash().get(String.valueOf(idGame),"time");
        map.setInitialTime(Integer.valueOf(time));
               
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
