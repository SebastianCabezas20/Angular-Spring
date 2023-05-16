package com.proyecto.backend;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class MongoTemplateConfig extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Override
    public MongoClient mongoClient() {
        return MongoClients.create(mongoUri);
    }

    @Override
    protected String getDatabaseName() {
        return extractDatabaseNameFromUri(mongoUri);
    }

    private String extractDatabaseNameFromUri(String uri) {
        int lastSlashIndex = uri.lastIndexOf("/");
        return uri.substring(lastSlashIndex + 1);
    }

    public void setDatabaseFromUri(String NewDatabase){
        this.mongoUri = extractUriWithoutDatabaseName(mongoUri)+NewDatabase;
    }


    private String extractUriWithoutDatabaseName(String uri) {
        int SlashIndex = uri.lastIndexOf("/");
        return uri.substring(0,SlashIndex);
    }

}
