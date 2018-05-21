/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.restController;

import com.gameci.thelast.logic.Map;
import com.gameci.thelast.persistence.GameServices;
import com.gameci.thelast.persistence.GameServicesException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author andres
 */

@Service
@RestController
@RequestMapping(value="/room")
public class restController {
    
    
    @Autowired
    private GameServices gss;
   
    @RequestMapping(method= RequestMethod.DELETE,path="/{idGame}/specialObject")
    public ResponseEntity<?> deleteSpecialObject(@PathVariable int idGame) throws GameServicesException{
        gss.removeSpecialObjectsToMap(idGame);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @RequestMapping(method= RequestMethod.GET,path="/{idGame}/specialObject")
    public ResponseEntity<?> getSpecialObject(@PathVariable int idGame) throws GameServicesException{
       Map map=gss.getMap(idGame);
       ResponseEntity<?> resp;
       if(map != null){
           resp= new ResponseEntity<>(map.getSpecialsObject(),HttpStatus.OK);
       }else{
           resp= new ResponseEntity<>(HttpStatus.NOT_FOUND);
       } 
       return resp;
    }
    
    @RequestMapping(method= RequestMethod.GET,path="/{idGame}/{playerName}")
    public ResponseEntity<?> getPlayer(@PathVariable int idGame,@PathVariable String playerName) throws GameServicesException{
       Map map=gss.getMap(idGame);
       ResponseEntity<?> resp;
       if(map != null){
           resp= new ResponseEntity<>(map.getWarrior(playerName),HttpStatus.OK);
       }else{
           resp= new ResponseEntity<>(HttpStatus.NOT_FOUND);
       } 
       return resp;
    }
    
    @RequestMapping(method= RequestMethod.GET,path="/{idGame}/zombies")
    public ResponseEntity<?> getZombies(@PathVariable int idGame) throws GameServicesException{
       Map map=gss.getMap(idGame);
       ResponseEntity<?> resp;
       if(map != null){
           resp= new ResponseEntity<>(map.getZombies(),HttpStatus.OK);
       }else{
           resp= new ResponseEntity<>(HttpStatus.NOT_FOUND);
       } 
       return resp;
    }
    
    
    @RequestMapping(method= RequestMethod.DELETE,path="/{idGame}/{playerName}")
    public ResponseEntity<?> deletePlayer(@PathVariable int idGame,@PathVariable String playerName) throws GameServicesException{
        gss.removeWarriorOfMap(playerName, idGame);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
