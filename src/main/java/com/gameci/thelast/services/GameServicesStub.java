/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.services;

import com.gameci.thelast.logic.Map;
import com.gameci.thelast.logic.Warrior;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 * @author andres
 */
public class GameServicesStub implements GameServices {
    private ConcurrentHashMap<Integer,Map> games;
    private GameServicesStub gss;
    
    public GameServicesStub(){
        games = new ConcurrentHashMap<>();
    }
    @Override
    public void createNewMap(int idGame) {
        if(!games.containsKey(idGame))
            games.put(idGame, new Map(idGame));
    }

    @Override
    public void addNewWarriorToMap(Warrior warrior, int idGame) {
        if(games.containsKey(idGame))
           games.get(idGame).addWarrior(warrior);
    }

    @Override
    public Map getMap(int idGame) {
        Map game=null;
        if(games.containsKey(idGame))
            game = games.get(idGame);
        return game;
        
    }
    
}
