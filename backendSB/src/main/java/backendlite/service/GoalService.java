package backendlite.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backendlite.model.Goal;
import backendlite.repository.GoalRepo;

@Service
public class GoalService {
    @Autowired
    private GoalRepo goalRepo;

    public Goal createGoal(Goal goal) {
        return goalRepo.save(goal);
    }

    public Goal findGoalByUserId(String userId) {
        // return goalRepo.findGoalByUserId(userId);
        return null;
    }
}
