package com.proyecto.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto.backend.Models.Videogame;
import com.proyecto.backend.Repositories.RepositoryVG;

@Service
public class VideogameService {

    @Autowired
    private RepositoryVG repositoryVG;

    public List<Videogame> FetchAll(){
        return repositoryVG.findAll();
    }
    
}
