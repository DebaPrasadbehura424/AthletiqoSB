package backendlite.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import backendlite.model.Otp;

public interface OtpRepo extends MongoRepository<Otp, ObjectId> {

}
