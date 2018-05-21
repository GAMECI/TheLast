/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.logic;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * Map Class, this class contains logic of the game
 *
 * @author andres
 */
public class Map {

    //Warriors into  the Map
    ConcurrentHashMap<String, Warrior> warriors;
    ConcurrentHashMap<String, Zombie> zombies;
    ConcurrentHashMap<Integer, SpecialObject> objects;
    private int idGame;
    long initialTime;
    long finalTime;

    public Map(int idGame) {
        this.idGame = idGame;
        warriors = new ConcurrentHashMap<String, Warrior>();
        zombies = new ConcurrentHashMap<String, Zombie>();
        objects = new ConcurrentHashMap<>();
        initialTime = System.currentTimeMillis();
        finalTime = System.currentTimeMillis();

    }

    /*
    *
     */
    public void addWarrior(Warrior warrior) {
        if (!warriors.containsKey(warrior.getName())) {
            warriors.put(warrior.getName(), warrior);
        }
    }

    public void deleteWarrior(String name) {
        if (warriors.containsKey(name)) {
            warriors.remove(name);
        }
    }

    public boolean containsWarrior(String name) {
        boolean resp = false;
        if (warriors.containsKey(name)) {
            resp = true;
        }
        return resp;
    }

    public Collection<Warrior> getWarriors() {
        Collection<Warrior> values = null;
        if (warriors != null) {
            values = warriors.values();
        }
        return values;
    }

    public Warrior getWarrior(String name) {
        Warrior selectedWarrior = null;
        if (warriors.containsKey(name)) {
            selectedWarrior = warriors.get(name);
        }
        return selectedWarrior;
    }

    //ZOMBIES
    public Collection<Zombie> getZombies() {
        Collection<Zombie> values = null;
        if (zombies != null) {
            values = zombies.values();
        }
        return values;
    }

    public void addZombie(Zombie zombie) {
        if (!zombies.containsKey(zombie.getId())) {
            zombies.put(zombie.getId(), zombie);
        }
    }

    public void deleteZombies(String warriorName) {       
        for(int i=0;i<3;i++){
            zombies.remove(Integer.toString(i)+warriorName);
        }
    }

    public Zombie getZombie(String id) {
        Zombie selectedZombie = null;
        if (zombies.containsKey(id)) {
            selectedZombie = zombies.get(id);
        }
        return selectedZombie;
    }

    public boolean containsZombie(String id) {
        boolean resp = false;
        if (zombies.containsKey(id)) {
            resp = true;
        }
        return resp;
    }

    public void addSpecialObject(SpecialObject object) {
        if (!objects.containsKey(object.getId())) {
            objects.put(object.getId(), object);
        }
    }
    public ConcurrentHashMap<Integer, SpecialObject> getSpecialsObject(){
        return objects;
    }
    
    public void removeSpecialObjects(){
        objects.clear();
    }

    public Long getInitalTime() {
        return initialTime;
    }
    
    public void setFinalToInitialTime(){
        initialTime=finalTime;
        finalTime=0;
    }

    public Long getFinalTime() {
        return finalTime;
    }

    public void setFinalTime() {
        finalTime = System.currentTimeMillis();
    }
    
    public void setWarriors(ConcurrentHashMap<String, Warrior> warriors){
        this.warriors=null;
        this.warriors=warriors;
    } 
    
    public void setZombies(ConcurrentHashMap<String, Zombie> zombies){
        this.zombies=null;
        this.zombies=zombies;
    }
    
    public void setObjects(ConcurrentHashMap<Integer, SpecialObject> objects){
        this.objects=null;
        this.objects=objects;
    } 
    public void setInitialTime(long initialTime){
       this.initialTime=initialTime;
    }
    public void setFinalTime(long finalTime){
        this.finalTime=finalTime;
    }
}
