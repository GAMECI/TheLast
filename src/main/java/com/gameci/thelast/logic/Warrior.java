/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.logic;

/**
 *
 * @author 2108419
 */
public class Warrior {
    private String name;
    private int healt;
    private String color;
    private int score;
    private int x;
    private int y;
    
    public Warrior(){
        
    }
    
    public Warrior(String name,int healt,String color,int score,int x,int y){
        this.name=name;
        this.healt=healt;
        this.color=color;
        this.score=score;
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
    public String getName(){
        return name;
    }
    public String getHealt(){
        return name;
    }
    public String getColor(){
        return name;
    }
    public String getScore(){
        return name;
    }
    public String getX(){
        return name;
    }
    public String getY(){
        return name;
    }
    public void setName(String name){
        this.name=name;
    }
    public void setHealt(int healt){
        this.healt=healt;
    }
    public void setColor(String color){
        this.color=color;
    }
    public void setScore(int score){
        this.score=score;
    }
    public void setX(int x){
        this.x=x;
    }
    public void setY(int y){
        this.y=y;
    }
    public String toString(){
        return "name= "+name+" healt= "+healt+" color= "+color+" score= "+score+" x= "+x+" y= "+y;
    }
    
}
