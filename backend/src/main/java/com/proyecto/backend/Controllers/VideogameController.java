package com.proyecto.backend.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.backend.Models.Videogame;
import com.proyecto.backend.services.VideogameService;

@RestController
@RequestMapping("/videogame")
@CrossOrigin(origins = "*")
public class VideogameController {

    @Autowired
    private VideogameService serviceVideojuego;

    @GetMapping("/get")
    public List<Videogame> getVideogame() {
        return this.serviceVideojuego.fetchAll();
    }

    @PostMapping("/create")
    public void createVideogame(@RequestBody Videogame videogame) {
        this.serviceVideojuego.create(videogame);
    }

    @GetMapping("/get/id")
    public Videogame getVideogameById(@RequestParam String id) {
        System.out.println("id FOR:" + id);
        return this.serviceVideojuego.getByID(id);
    }

    @DeleteMapping("delete/id")
    public Videogame deleteVideogameId(@RequestParam String id) {
        return this.serviceVideojuego.deleteByID(id);
    }

    @PatchMapping("update/id")
    public void putVideogameId(@RequestBody Videogame videogame) {
        System.out.println("VIDEOJUEGO UPDATE" + videogame.getGenre());
        this.serviceVideojuego.update(videogame);

    }

    @GetMapping("/get/name")
    public Videogame getVideogameByName(@RequestParam String name) {
        return this.serviceVideojuego.getByName(name);
    }
}
