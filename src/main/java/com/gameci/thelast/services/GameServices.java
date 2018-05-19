/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.services;

import com.gameci.thelast.logic.Bullet;
import com.gameci.thelast.logic.Map;
import com.gameci.thelast.logic.Warrior;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 * @author andres
 */
public interface  GameServices {
    public ConcurrentHashMap<Integer, Map> getAviableGames();
    void createNewMap(int idGame) throws GameServicesException;
    void addNewWarriorToMap(Warrior warrior,int idGame) throws GameServicesException;
    void updateWarrior(Warrior warrior,int idGame) throws GameServicesException;
    Map getMap(int idGame)throws GameServicesException;
    public void addBulletToMap(Bullet bullet, int idGame) throws GameServicesException;
    public void updateBullet(Bullet bullet, int idGame) throws GameServicesException ;
    public void removeSpecialObjectsToMap(int idGame);
   
}
