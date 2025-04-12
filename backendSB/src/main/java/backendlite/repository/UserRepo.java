package backendlite.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import backendlite.model.User;

public interface UserRepo extends MongoRepository<User, ObjectId> {

    User findUserByEmail(String email);

    User findById(String userId);
}
