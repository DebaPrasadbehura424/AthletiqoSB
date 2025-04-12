package backendlite.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import backendlite.model.Plan;
import backendlite.repository.PlanRepo;

@Service
public class PlanService {

    @Autowired
    private PlanRepo planRepo;

    public Plan createPlan(Plan plan) {
        return planRepo.save(plan);
    }

}
