package backendlite.director;

import java.util.Date;

import lombok.Data;

@Data
public class Tasks {
    private String taskName;
    private Date dueDate;
}
