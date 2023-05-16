package com.proyecto.backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.backend.Models.Videogame;

@Repository
public interface RepositoryVG extends MongoRepository<Videogame,String>{


}
