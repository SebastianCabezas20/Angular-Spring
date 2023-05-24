package com.proyecto.backend.Models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Document("videojuegos")
public class Videogame {
    @Id 
    String id;
    String Name;
    String Platform;
    int Year_of_Release;
    String Genre;
    String Publisher;
    float Global_Sales;
    String Developer;
    String Rating;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return Name;
    }
    public void setName(String name) {
        Name = name;
    }
    public String getPlatform() {
        return Platform;
    }
    public void setPlatform(String platform) {
        Platform = platform;
    }
    public int getYear_of_Release() {
        return Year_of_Release;
    }
    public void setYear_of_Release(int year_of_Release) {
        Year_of_Release = year_of_Release;
    }
    public String getGenre() {
        return Genre;
    }
    public void setGenre(String genre) {
        Genre = genre;
    }
    public String getPublisher() {
        return Publisher;
    }
    public void setPublisher(String publisher) {
        Publisher = publisher;
    }
    public float getGlobal_Sales() {
        return Global_Sales;
    }
    public void setGlobal_Sales(float global_Sales) {
        Global_Sales = global_Sales;
    }
    public String getDeveloper() {
        return Developer;
    }
    public void setDeveloper(String developer) {
        Developer = developer;
    }
    public String getRating() {
        return Rating;
    }
    public void setRating(String rating) {
        Rating = rating;
    }
    

 
    
    
    
}
