package backendlite.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import backendlite.model.Shop;

public interface ShopRepo extends MongoRepository<Shop, ObjectId> {

}
