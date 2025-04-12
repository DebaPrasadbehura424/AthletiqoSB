package backendlite.model;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import backendlite.director.ShopList;
import lombok.Data;

@Document(collection = "shop")
@Data
public class Shop {
    @Id
    private ObjectId id;
    private List<ShopList> shopLists;

}
