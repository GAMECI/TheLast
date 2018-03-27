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
    private int idGame;
    
    public Map(int idGame){
        this.idGame=idGame;
        warriors= new ConcurrentHashMap<String,Warrior>();
    }
    
    public void addWarrior(Warrior warrior){
        if(!warriors.containsKey(warrior.getName()))
            warriors.put(warrior.getName(),warrior);
    }
    
    public void deleteWarrior(String name){
        if(warriors.containsKey(name))
            warriors.remove(name);
    } 
    public Collection<Warrior> getWarriors(){
        Collection<Warrior> values=null;
        if(warriors!=null)
            values=warriors.values();
        return values;
    }
}
