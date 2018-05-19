/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.logic;

/**
 *
 * @author andres
 */
public class SpecialObject {
    private int posx;
    private int posy;
    private String type;
    private int id;
    
    public SpecialObject(int posX,int posY, String type, int id){
        this.posx=posX;
        this.posy=posY;
        this.type=type;
        this.id=id;
    }
    
    public int getId(){
        return id;
    }
    public int getPosx(){
        return posx;
    }
    public int getPosy(){
        return posy;
    }
    public String getType(){
        return type;
    }
            
}
