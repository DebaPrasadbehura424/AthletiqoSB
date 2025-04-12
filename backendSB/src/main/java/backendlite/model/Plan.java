package backendlite.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import backendlite.director.Section;
import lombok.Data;

import java.util.List;

@Data
@Document(collection = "plans")
@JsonInclude(value = Include.NON_NULL)
public class Plan {
    @Id
    private ObjectId id;
    private List<Section> sections;

}
