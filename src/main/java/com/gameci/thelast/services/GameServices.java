/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.services;

import com.gameci.thelast.logic.Map;
import com.gameci.thelast.logic.Warrior;

/**
 *
 * @author andres
 */
public interface  GameServices {

    void createNewMap(int idGame) throws GameServicesException;
    void addNewWarriorToMap(Warrior warrior,int idGame) throws GameServicesException;
    Map getMap(int idGame)throws GameServicesException;
   
}
