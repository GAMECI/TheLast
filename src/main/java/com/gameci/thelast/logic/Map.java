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
    ConcurrentHashMap<Integer,SpecialObject> objects;
    private int idGame;
    long initialTime;
    long finalTime;
  
    public Map(int idGame){
        this.idGame=idGame;
        warriors= new ConcurrentHashMap<String,Warrior>();
        objects= new ConcurrentHashMap<>();
        initialTime= System.currentTimeMillis();
        finalTime= System.currentTimeMillis();
        
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
    public void addSpecialObject(SpecialObject object){
        if(!objects.containsKey(object.getId())){
            objects.put(object.getId(), object);    
        }    
    }
    
    public Long getInitalTime(){
        return initialTime;
    }
    
    public Long getFinalTime(){
        return finalTime;
    }
      
    public void setFinalTime(){
        finalTime=System.currentTimeMillis();
    }
}