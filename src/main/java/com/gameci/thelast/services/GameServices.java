/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.services;

import com.gameci.thelast.logic.Map;
import com.gameci.thelast.logic.Warrior;
import com.gameci.thelast.logic.Zombie;

/**
 *
 * @author andres
 */
public interface  GameServices {

    void createNewMap(int idGame) throws GameServicesException;
    void addNewWarriorToMap(Warrior warrior,int idGame) throws GameServicesException;
    void updateWarrior(Warrior warrior,int idGame) throws GameServicesException;
    Map getMap(int idGame)throws GameServicesException;
    void addNewZombieToMap(Zombie zombie,int idGame) throws GameServicesException;
    void updateZombie(Zombie zombie,int idGame) throws GameServicesException;
   
}
