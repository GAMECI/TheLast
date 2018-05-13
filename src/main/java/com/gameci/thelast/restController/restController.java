/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gameci.thelast.restController;

import com.gameci.thelast.services.GameServices;
import com.gameci.thelast.services.GameServicesException;
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
}
