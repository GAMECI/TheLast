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
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
/**
 *Map Class, this class contains logic  of the game
 * @author andres
 */
public class Map {
    //Warriors into  the Map
    ConcurrentHashMap<String,Warrior>  warriors;
    ConcurrentHashMap<String,Bullet> bullets;
    private int idGame;
    
    public Map(int idGame){
        this.idGame=idGame;
        warriors= new ConcurrentHashMap<String,Warrior>();
        bullets= new ConcurrentHashMap<String,Bullet>();
    }
    public void addBullet(Bullet bullet){
        if(!bullets.containsKey(bullet.getId()))
            bullets.put(bullet.getId(),bullet);
    }
    public void deleteBullet(String id){
        if(bullets.containsKey(id))
            bullets.remove(id);
    }
    public boolean containsBullet(String id){
        boolean resp=false;
        if(bullets.containsKey(id))
            resp=true;
        return resp;
    }
    public Collection<Bullet> getBullets(){
        Collection<Bullet> values=null;
        if(bullets!=null)
            values=bullets.values();
        return values;
    }
    
    public Bullet getBullet(String id){
        Bullet selectedBullet=null;
        if(bullets.containsKey(id)){
            selectedBullet=bullets.get(id);
        }
        return selectedBullet;
    }
    /*
    *
    */
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
}
