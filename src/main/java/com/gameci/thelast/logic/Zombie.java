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
    private int xz;
    private int yz;    
    private String id;
    private String status;
    
    public Zombie(){
        
    }
    
    public Zombie(int healt, int posx, int posy, String id, String status){
        this.id=id;
        this.healt = healt;
        this.xz = posx;
        this.yz = posy;    
        this.status=status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
        return xz;
    }

    public void setPosx(int posx) {
        this.xz = posx;
    }

    public int getPosy() {
        return yz;
    }

    public void setPosy(int posy) {
        this.yz = posy;
    }
    
    public String toString(){
        return " id= " + id +" healt= "+healt+" posx= "+xz+" posy= "+yz;
    }
    
    
    
    
}