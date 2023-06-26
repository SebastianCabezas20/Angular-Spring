package com.proyecto.backend.Repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.proyecto.backend.Models.Videogame;

@Repository
public interface RepositoryVG extends MongoRepository<Videogame, String> {

    Videogame deleteByid(String id);

    @Query(" { Name : { $regex : ?0 } }")
    Videogame[] FindByName(String Name);

    @Aggregation(pipeline = {
            "{'$match': {'Name': {'$regex': ?2}}}",
            "{ '$skip' : ?0}",
            "{ '$limit' : ?1 }"
    })
    List<Videogame> findByPage(int skip, int limit, String Name);

    @Aggregation(pipeline = {
            "{'$match': {'Name': {'$regex': ?0}}}",
    })
    List<Videogame> FindAndCountSearch(String busqueda);
}