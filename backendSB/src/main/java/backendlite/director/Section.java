package backendlite.director;

import java.util.List;

import lombok.Data;

@Data
public class Section {

    private String sectionName;
    private List<Tasks> tasks;

}
