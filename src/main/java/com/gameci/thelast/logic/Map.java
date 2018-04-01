/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.logic;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
/**
 *
 * @author andres
 */
public class Map {
    ConcurrentHashMap<String,Warrior>  warriors;
    ConcurrentHashMap<String,Zombie>  zombies;
    private int idGame;        
    
    public Map(int idGame){
        this.idGame=idGame;
        warriors= new ConcurrentHashMap<String,Warrior>();
        zombies = new ConcurrentHashMap<String,Zombie>();
    }
    
    public void addWarrior(Warrior warrior){
        if(!warriors.containsKey(warrior.getName()))
            warriors.put(warrior.getName(),warrior);
    }
    
    public void deleteWarrior(String name){
        if(warriors.containsKey(name))
            warriors.remove(name);
    } 
    
    public boolean containsWarrior(String name){
        boolean resp=false;
        if(warriors.containsKey(name))
            resp=true;
        return resp;
    }
    
    public Collection<Warrior> getWarriors(){
        Collection<Warrior> values=null;
        if(warriors!=null)
            values=warriors.values();
        return values;
    }
    
    public Warrior getWarrior(String name){
        Warrior selectedWarrior=null;
        if(warriors.containsKey(name)){
            selectedWarrior=warriors.get(name);
        }
        return selectedWarrior;
    }
    
    //ZOMBIES
    
    public Collection<Zombie> getZombies(){
        Collection<Zombie> values=null;
        if(zombies!=null)
            values=zombies.values();
        return values;
    }
    
    public void addZombie(Zombie zombie){
        if(!warriors.containsKey(zombie.getId()))
            zombies.put(zombie.getId(),zombie);
    }
    
    public void deleteZombie(String id){
        if(warriors.containsKey(id))
            warriors.remove(id);
    }
    
    public Zombie getZombie(String id){
        Zombie selectedZombie=null;
        if(zombies.containsKey(id)){
            selectedZombie=zombies.get(id);
        }
        return selectedZombie;
    }
    
    public boolean containsZombie(String id){
        boolean resp=false;
        if(zombies.containsKey(id))
            resp=true;
        return resp;
    }
    
        
    
    
}
