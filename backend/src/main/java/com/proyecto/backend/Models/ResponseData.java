package com.proyecto.backend.Models;

import java.util.List;

public class ResponseData {
    List<Videogame> videojuegos;
    Long numeroDocumentos;

    public List<Videogame> getVideojuegos() {
        return videojuegos;
    }

    public void setVideojuegos(List<Videogame> videojuegos) {
        this.videojuegos = videojuegos;
    }

    public Long getNumeroDocumentos() {
        return numeroDocumentos;
    }

    public void setNumeroDocumentos(Long numeroDocumentos) {
        this.numeroDocumentos = numeroDocumentos;
    }

}
