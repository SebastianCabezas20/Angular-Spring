package com.proyecto.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto.backend.Models.ResponseData;
import com.proyecto.backend.Models.Videogame;
import com.proyecto.backend.Repositories.RepositoryVG;

@Service
public class VideogameService {

    @Autowired
    private RepositoryVG repositoryVG;

    // Obtener todos los videojuegos
    public ResponseData fetchAll(int skip, int numeroPorPagina, String busqueda) {
        // Obtencion de documentos
        List<Videogame> lista = repositoryVG.findByPage(skip, numeroPorPagina, busqueda);
        // Preparar la respuesta
        int numero = repositoryVG.FindAndCountSearch(busqueda).size();
        ResponseData response = new ResponseData();
        response.setNumeroDocumentos(numero);
        response.setVideojuegos(lista);
        return response;
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

    // Obtener de un videojuego por su nombre para busqueda
    public Videogame[] getByName(String name) {

        try {
            return repositoryVG.FindByName(name);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public long countDocument() {
        return repositoryVG.count();
    }
}
