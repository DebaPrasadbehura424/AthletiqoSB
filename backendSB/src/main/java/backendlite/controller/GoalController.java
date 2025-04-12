package backendlite.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import backendlite.model.Goal;
import backendlite.model.User;
import backendlite.service.GoalService;
import backendlite.service.UserService;

@RestController
@RequestMapping("/goals")
public class GoalController {

    @Autowired
    private GoalService goalService;
    @Autowired
    private UserService userService;

    @PatchMapping("/update/{userId}")
    public ResponseEntity<?> updateGoal(@PathVariable String userId, @RequestBody Goal goal) {
        User user = userService.findById(userId);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }
        Goal goalExit = user.getGoalDetails();
        if (goalExit == null) {
            return new ResponseEntity<>("Goal not found for the user", HttpStatus.BAD_REQUEST);
        }
        if (goal.getSleepGoalOneDay() != 0.0) {
            goalExit.setSleepGoalOneDay(goalExit.getSleepGoalOneDay() + 1);
        }
        if (goal.getWaterGoalOneDay() != 0.0) {
            goalExit.setWaterGoalOneDay(goalExit.getWaterGoalOneDay() + 1);
        }
        if (goal.getWalkingGoalOneDay() != 0.0) {
            goalExit.setWalkingGoalOneDay(goalExit.getWalkingGoalOneDay() + 1);
        }
        if (goal.getReadingGoalOneDay() != 0.0) {
            goalExit.setReadingGoalOneDay(goalExit.getReadingGoalOneDay() + 1);
        }
        goalService.createGoal(goalExit);
        return new ResponseEntity<>(goalExit, HttpStatus.OK);
    }

    @PatchMapping("/trackcal/{userId}/{meal}")
    public ResponseEntity<?> trackcal(@PathVariable String userId, @PathVariable String meal) {
        User user = userService.findById(userId);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }
        Goal goalExit = user.getGoalDetails();
        if (goalExit == null) {
            return new ResponseEntity<>("Goal not found for the user", HttpStatus.BAD_REQUEST);
        }

        if (meal.equals("breakfast")) {
            goalExit.setFirstmeal(!goalExit.isFirstmeal());
        }
        if (meal.equals("lunch")) {
            goalExit.setSecmeal(!goalExit.isSecmeal());
        }
        if (meal.equals("dinner")) {
            goalExit.setThirdmeal(!goalExit.isThirdmeal());
        }
        goalService.createGoal(goalExit);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/addPoints/{userId}/{points}")
    public ResponseEntity<?> addPoints(@PathVariable String userId, @PathVariable Double points) {
        User user = userService.findById(userId);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }

        Goal goal = user.getGoalDetails();
        if (goal == null) {
            return new ResponseEntity<>("Goal not found for the user", HttpStatus.BAD_REQUEST);
        }
        Date currentDate = new Date();
        String currentTime = currentDate.toString().substring(0, 10);
        String goalcurrentTime = goal.getCurrentDay().toString().substring(0, 10);

        if (!currentTime.equals(goalcurrentTime)) {

            goal.setPonitsIndex((goal.getPonitsIndex() + 1) % 7);
            goal.setTodayPoints(0.0);
            goal.setFirstmeal(false);
            goal.setSecmeal(false);
            goal.setThirdmeal(false);
            goal.setSleepGoalOneDay(0);
            goal.setWalkingGoalOneDay(0);
            goal.setWaterGoalOneDay(0);
            goal.setReadingGoalOneDay(0);
            goal.setCurrentDay(new Date());
        }
        if (currentTime.equals(goalcurrentTime)) {
            Integer index = goal.getPonitsIndex();
            goal.setPonitsIndex((goal.getPonitsIndex() + 1) % 7);
            int totalPoints = (int) (goal.getDailyPoints()[index] + points);
            goal.getDailyPoints()[index] = totalPoints;
        }

        goal.setTodayPoints(goal.getTodayPoints() + points);
        goal.setTotalPoints(goal.getTotalPoints() + points);

        goalService.createGoal(goal);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}