/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.logic;

/**
 *
 * @author 2114928
 */
public class Bullet {
    private String id;
    private int x;
    private int y;
    
    public Bullet(){
        
    }
    
    public Bullet(String id,int x,int y){  
        this.id = id;
        this.x=x;
        this.y=y;
    }
    
    public void shoot(){
        
    }
    
    public void move(String direction){
        
    }
    
    public void death(){
    }
    
    public void isAlive(){
        
    }
    public String getId(){
        return id;
    }

    public int getX(){
        return x;
    }
    public int getY(){
        return y;
    }
    public void setId(String id){
        this.id=id;
    }
    public void setX(int x){
        this.x=x;
    }
    public void setY(int y){
        this.y=y;
    }
    public String toString(){
        return "Id= "+id+" x= "+x+" y= "+y;
    }
}
