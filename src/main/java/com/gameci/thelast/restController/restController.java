/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.restController;

import com.gameci.thelast.logic.Map;
import com.gameci.thelast.services.GameServices;
import com.gameci.thelast.services.GameServicesException;
import com.gameci.thelast.services.GameServicesStub;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
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
    
    @RequestMapping(method= RequestMethod.GET, path="/")
    public ArrayList<Integer> getAviableGames() throws GameServicesException{
        ConcurrentHashMap<Integer, Map> aviGames = gss.getAviableGames();
        ArrayList<Integer> numbers = new ArrayList<Integer>();
        Iterator<Integer> keySetIterator = aviGames.keySet().iterator();
        while(keySetIterator.hasNext()){
          Integer key = keySetIterator.next();
          numbers.add(key);
        }
        return numbers;
    }
}