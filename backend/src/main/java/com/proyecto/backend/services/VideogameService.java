package com.proyecto.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto.backend.Models.Videogame;
import com.proyecto.backend.Repositories.RepositoryVG;

@Service
public class VideogameService {

    @Autowired
    private RepositoryVG repositoryVG;

    // Obtener todos los videojuegos
    public List<Videogame> fetchAll() {
        return repositoryVG.findAll();
    }

    // Creacion de un videojuego
    public void create(Videogame videogame) {
        try {
            repositoryVG.save(videogame);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    // Obtener videojuego por ID
    public Videogame getByID(String Id) {
        Optional<Videogame> video = repositoryVG.findById(Id);
        if (video.isPresent()) {
            return video.get();
        }
        return null;
    }

    // Borrar videojuego por ID
    public Videogame deleteByID(String Id) {
        try {
            return repositoryVG.deleteByid(Id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    // update de un videojuego
    public void update(Videogame videogame) {
        try {
            repositoryVG.save(videogame);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    // Obtener de un videojuego por su nombre
    public Videogame getByName(String name) {
        try {
            return repositoryVG.findByName(name);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }
}
