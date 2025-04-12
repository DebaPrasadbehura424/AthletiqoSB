package backendlite.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import backendlite.model.Goal;

public interface GoalRepo extends MongoRepository<Goal, ObjectId> {

    // Goal findGoalByUserId(String userId);

}
