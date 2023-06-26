package com.proyecto.backend.Models;

import java.util.List;

public class ResponseData {
    List<Videogame> videojuegos;
    int numeroDocumentos;

    public List<Videogame> getVideojuegos() {
        return videojuegos;
    }

    public void setVideojuegos(List<Videogame> videojuegos) {
        this.videojuegos = videojuegos;
    }

    public int getNumeroDocumentos() {
        return numeroDocumentos;
    }

    public void setNumeroDocumentos(int numeroDocumentos) {
        this.numeroDocumentos = numeroDocumentos;
    }

}
