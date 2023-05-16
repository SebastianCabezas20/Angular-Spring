package com.proyecto.backend.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.backend.Models.Videogame;
import com.proyecto.backend.services.VideogameService;

@RestController
@RequestMapping("/videojuego")
public class VideogameController {

    @Autowired
    private VideogameService serviceVideojuego;

    @GetMapping("/create")
    public List<Videogame> createVideogame(){
        return this.serviceVideojuego.FetchAll();
    }

}
