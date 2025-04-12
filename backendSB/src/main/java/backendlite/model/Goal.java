package backendlite.model;

import java.util.Arrays;
import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "goals")
public class Goal {

    @Id
    private ObjectId id;

    private Double currentWeight = 0.0;
    private Double targetWeight = 0.0;
    private Double sleepGoal = 0.0;
    private Double readingGoal = 0.0;
    private Double waterGoal = 0.0;
    private Double age = 0.0;
    private Double walkingGoal = 0.0;
    private Double totalPoints = 0.0;
    private Double todayPoints = 0.0;
    private Integer[] dailyPoints = new Integer[7];
    {
        Arrays.fill(dailyPoints, 0);
    }
    private Integer ponitsIndex = 0;
    private Date currentDay = new Date();
    private Integer sleepGoalOneDay = 0;
    private Integer readingGoalOneDay = 0;
    private Integer waterGoalOneDay = 0;
    private Integer walkingGoalOneDay = 0;
    private boolean firstmeal = false;
    private boolean secmeal = false;
    private boolean thirdmeal = false;

}
