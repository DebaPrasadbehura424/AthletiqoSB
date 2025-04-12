package backendlite.model;

import lombok.Data;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@Document(collection = "users")
@JsonInclude(value = Include.NON_NULL)

public class User {

    @Id
    private ObjectId id;

    private String firstName;
    private String email;
    private String password;

    @DBRef
    private Goal goalDetails;

    @DBRef
    private Plan todoList;

    @DBRef
    private Shop shop;

}
