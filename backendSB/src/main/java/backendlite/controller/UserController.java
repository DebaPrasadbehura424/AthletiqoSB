package backendlite.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import backendlite.component.Jutils;
import backendlite.director.Section;
import backendlite.director.Tasks;
import backendlite.model.Plan;
import backendlite.model.Shop;
import backendlite.model.User;
import backendlite.repository.UserRepo;
import backendlite.response.UserTokenResponse;
import backendlite.model.Goal;
import backendlite.service.GoalService;
import backendlite.service.PlanService;
import backendlite.service.ShopService;
import backendlite.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private GoalService goalService;
    @Autowired
    private PlanService planService;
    @Autowired
    private ShopService shopService;
    @Autowired
    private Jutils jutils;

    @PostMapping("/userRegister")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        String email = user.getEmail();
        String firstName = email.split("@")[0];
        user.setFirstName(firstName);

        User isUserExit = userService.findUserByEmail(user.getEmail());
        if (isUserExit != null) {
            return new ResponseEntity<>("User already exists", HttpStatus.BAD_REQUEST);
        }

        // goals
        Goal goal = goalService.createGoal(new Goal());
        // plans
        Plan plan = new Plan();
        Section section1 = new Section();
        section1.setSectionName("Morning Routine");
        List<Tasks> tasksList = new ArrayList<>();
        Tasks task1 = new Tasks();
        task1.setTaskName("Wake up before 9:00 AM");
        task1.setDueDate(new Date());
        tasksList.add(task1);
        section1.setTasks(tasksList);
        List<Section> sections = new ArrayList<>();
        sections.add(section1);
        plan.setSections(sections);
        planService.createPlan(plan);

        // shop
        Shop shop = shopService.crateShop(new Shop());

        // save plan goal shop

        user.setGoalDetails(goal);
        user.setTodoList(plan);
        user.setShop(shop);
        // save user
        User createdUser = userService.creatUser(user);

        String userId = createdUser.getId().toString();

        String token = jutils.generateToken(createdUser.getEmail());
        UserTokenResponse createdData = new UserTokenResponse(createdUser, token, userId);
        return new ResponseEntity<>(createdData, HttpStatus.CREATED);
    }

    @PostMapping("/userLogin")
    public ResponseEntity<?> userLogin(@RequestBody User user) {
        User isUserExist = userService.findUserByEmail(user.getEmail());
        if (isUserExist == null) {
            return new ResponseEntity<>("User does not exist. Please first register", HttpStatus.BAD_REQUEST);
        }

        if (!user.getPassword().equals(isUserExist.getPassword())) {
            return new ResponseEntity<>("Password mismatch", HttpStatus.BAD_REQUEST);
        }

        String userId = isUserExist.getId().toString();
        String token = jutils.generateToken(isUserExist.getEmail());

        UserTokenResponse loginUserDetailResponse = new UserTokenResponse(isUserExist, token, userId);
        return new ResponseEntity<>(loginUserDetailResponse, HttpStatus.OK);
    }

    @PostMapping("/userLoginByOauth")
    public ResponseEntity<?> userLoginByUser(@RequestBody User user) {
        User isUserExist = userService.findUserByEmail(user.getEmail());
        if (isUserExist == null) {
            return new ResponseEntity<>("User does not exist. Please first register", HttpStatus.BAD_REQUEST);
        }
        String userId = isUserExist.getId().toString();
        String token = jutils.generateToken(isUserExist.getEmail());
        UserTokenResponse loginUserDetailResponse = new UserTokenResponse(isUserExist, token, userId);
        return new ResponseEntity<>(loginUserDetailResponse, HttpStatus.OK);
    }

    @GetMapping("/getUserDetails")
    public ResponseEntity<?> getUserDetails(@RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        String email = jutils.extractSubject(token);
        if (email == null) {
            return new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
        }

        User user = userService.findUserByEmail(email);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        String userId = user.getId().toString();
        UserTokenResponse response = new UserTokenResponse(user, userId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<?> updateGoal(@PathVariable String userId, @RequestBody Goal goal) {
        User userExit = userService.findById(userId);
        if (userExit == null) {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }

        Goal newGoal = userExit.getGoalDetails();
        if (newGoal == null) {
            return new ResponseEntity<>("Goal not found", HttpStatus.BAD_REQUEST);
        }

        newGoal.setAge(goal.getAge());
        newGoal.setReadingGoal(goal.getReadingGoal());
        newGoal.setCurrentWeight(goal.getCurrentWeight());
        newGoal.setTargetWeight(goal.getTargetWeight());
        newGoal.setSleepGoal(goal.getSleepGoal());
        newGoal.setWaterGoal(goal.getWaterGoal());
        newGoal.setWalkingGoal(goal.getWalkingGoal());

        goalService.createGoal(newGoal);
        userExit.setGoalDetails(newGoal);
        userService.creatUser(userExit);

        return new ResponseEntity<>(newGoal, HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        List<User> userList = userRepo.findAll();
        if (userList == null || userList.isEmpty()) {
            return new ResponseEntity<>("No users found", HttpStatus.NOT_FOUND);
        }
        List<Map<String, Object>> usersToReturn = new ArrayList<>();

        for (User user : userList) {
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("firstName", user.getFirstName());

            Goal goalDetails = user.getGoalDetails();
            if (goalDetails != null) {
                userMap.put("totalPoints", goalDetails.getTotalPoints());
            } else {
                userMap.put("totalPoints", 0);
            }

            usersToReturn.add(userMap);
        }

        List<Map<String, Object>> result = usersToReturn.size() > 10 ? usersToReturn.subList(0, 10) : usersToReturn;

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
