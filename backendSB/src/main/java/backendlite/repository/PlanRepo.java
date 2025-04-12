package backendlite.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import backendlite.model.Plan;

public interface PlanRepo extends MongoRepository<Plan, ObjectId> {

}
