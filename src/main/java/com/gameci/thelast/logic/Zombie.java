/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.logic;

/**
 *
 * @author daniel
 */
public class Zombie {
    private int healt;
    private int posx;
    private int posy;    
    private String id;
    
    public Zombie(int healt, int posx, int posy, String id){
        this.id=id;
        this.healt = healt;
        this.posx = posx;
        this.posy = posy;    
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }        
    
    public int getHealt() {
        return healt;
    }

    public void setHealt(int healt) {
        this.healt = healt;
    }

    public int getPosx() {
        return posx;
    }

    public void setPosx(int posx) {
        this.posx = posx;
    }

    public int getPosy() {
        return posy;
    }

    public void setPosy(int posy) {
        this.posy = posy;
    }
    
    public String toString(){
        return " id= " + id +" healt= "+healt+" posx= "+posx+" posy= "+posy;
    }
    
    
    
    
}
