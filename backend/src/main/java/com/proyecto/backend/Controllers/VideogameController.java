package com.proyecto.backend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.backend.Models.Pagination;
import com.proyecto.backend.Models.ResponseData;
import com.proyecto.backend.Models.Videogame;
import com.proyecto.backend.services.VideogameService;

@RestController
@RequestMapping("/videogame")
@CrossOrigin(origins = "*")
public class VideogameController {

    @Autowired
    private VideogameService serviceVideojuego;

    @PostMapping("/get")
    public ResponseEntity<ResponseData> getVideogame(@RequestBody Pagination page) {
        return ResponseEntity
                .ok(this.serviceVideojuego.fetchAll(page.getSkip(), page.getNumeroPorPagina(), page.getBusqueda()));

    }

    @PostMapping("/create")
    public void createVideogame(@RequestBody Videogame videogame) {
        this.serviceVideojuego.create(videogame);
    }

    @GetMapping("/get/id")
    public ResponseEntity<Videogame> getVideogameById(@RequestParam String id) {
        Videogame videogame = this.serviceVideojuego.getByID(id);
        if (videogame == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(videogame);

    }

    @DeleteMapping("delete/id")
    public Videogame deleteVideogameId(@RequestParam String id) {
        return this.serviceVideojuego.deleteByID(id);
    }

    @PatchMapping("update/id")
    public void putVideogameId(@RequestBody Videogame videogame) {
        this.serviceVideojuego.update(videogame);

    }

    @GetMapping("/get/name")
    public Videogame[] getVideogamesByName(@RequestParam String name) {
        return this.serviceVideojuego.getByName(name);
    }
}
