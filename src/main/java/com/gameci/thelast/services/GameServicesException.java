/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.services;

/**
 *
 * @author andres
 */
public class GameServicesException extends Exception{
        public GameServicesException(String msg, Throwable cause){
            super(msg,cause);
        }
        public GameServicesException(String msg){
            super(msg);
        }
}
