/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.persistence;

/**
 *
 * @author andres
 */
public class GameServicesException extends Exception{
        private String error;
        public GameServicesException(String msg, Throwable cause){
            super(msg,cause);
        }
        public GameServicesException(String msg){
            super(msg);
        }
        
        public String getError(){
            return getMessage();
        }
}
