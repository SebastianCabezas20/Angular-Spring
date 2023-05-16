package com.proyecto.backend.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("videojuegos")
public class Videogame {
    @Id String _id;
    String nombre;
    public Videogame(String _id, String nombre) {
        this._id = _id;
        this.nombre = nombre;
    }
    public String get_id() {
        return _id;
    }
    public void set_id(String _id) {
        this._id = _id;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    
    
}
