package backendlite.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "Otp")
@Data
public class Otp {
    @Id
    private ObjectId id;
    private String Otp;

}
