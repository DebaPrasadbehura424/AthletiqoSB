package backendlite.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backendlite.director.Section;
import backendlite.director.Tasks;
import backendlite.model.Plan;
import backendlite.model.User;
import backendlite.repository.PlanRepo;
import backendlite.service.UserService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/plans")
public class PlanController {

    @Autowired
    private UserService userService;

    @Autowired
    private PlanRepo planRepo;

    @PostMapping("/section/{userId}/{sectionName}")
    public ResponseEntity<?> CreateSection(@PathVariable String userId, @PathVariable String sectionName) {
        Section section = new Section();
        section.setSectionName(sectionName);

        User isUserExit = userService.findById(userId);
        if (isUserExit == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Plan plan = isUserExit.getTodoList();
        plan.getSections().add(section);
        planRepo.save(plan);
        return new ResponseEntity<>(section, HttpStatus.OK);
    }

    @PostMapping("/task/{userId}/{id}")
    public ResponseEntity<?> createTask(@PathVariable String userId, @PathVariable Integer id,
            @RequestBody Tasks createTasks) {
        User isUserExist = userService.findById(userId);
        if (isUserExist == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Plan plan = isUserExist.getTodoList();
        List<Section> sections = plan.getSections();

        Section section = sections.get(id);

        if (section.getTasks() == null) {
            section.setTasks(new ArrayList<>());
        }

        Tasks task = new Tasks();
        task.setTaskName(createTasks.getTaskName());
        task.setDueDate(new Date());

        section.getTasks().add(task);

        planRepo.save(plan);

        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @DeleteMapping("/section/{userId}/{sectionId}/delete")
    public ResponseEntity<?> deleteSection(@PathVariable String userId, @PathVariable Integer sectionId) {
        User isUserExist = userService.findById(userId);
        if (isUserExist == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Plan plan = isUserExist.getTodoList();
        List<Section> sections = plan.getSections();

        if (sectionId < 0 || sectionId >= sections.size()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        sections.remove((int) sectionId);
        planRepo.save(plan);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/task/{userId}/{sectionId}/{taskId}/delete")
    public ResponseEntity<?> deleteTask(@PathVariable String userId, @PathVariable Integer sectionId,
            @PathVariable Integer taskId) {
        User isUserExist = userService.findById(userId);
        if (isUserExist == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Plan plan = isUserExist.getTodoList();
        List<Section> sections = plan.getSections();
        if (sectionId < 0 || sectionId >= sections.size()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Section section = sections.get(sectionId);
        List<Tasks> tasks = section.getTasks();
        if (taskId < 0 || taskId >= tasks.size()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        tasks.remove((int) taskId);
        planRepo.save(plan);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/section/{userId}/{sectionId}")
    public ResponseEntity<?> modifySection(@PathVariable String userId, @PathVariable Integer sectionId,
            @RequestBody Section updatedSection) {
        User isUserExist = userService.findById(userId);
        if (isUserExist == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Plan plan = isUserExist.getTodoList();
        List<Section> sections = plan.getSections();

        if (sectionId < 0 || sectionId >= sections.size()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Section section = sections.get(sectionId);
        section.setSectionName(updatedSection.getSectionName());

        planRepo.save(plan);

        return new ResponseEntity<>(plan, HttpStatus.OK);
    }

    @PutMapping("/task/{userId}/{sectionId}/{taskId}")
    public ResponseEntity<?> modifyTask(@PathVariable String userId, @PathVariable Integer sectionId,
            @PathVariable Integer taskId, @RequestBody Tasks updatedTask) {
        User isUserExist = userService.findById(userId);
        if (isUserExist == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Plan plan = isUserExist.getTodoList();
        List<Section> sections = plan.getSections();

        if (sectionId < 0 || sectionId >= sections.size()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Section section = sections.get(sectionId);
        List<Tasks> tasks = section.getTasks();

        if (taskId < 0 || taskId >= tasks.size()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Tasks task = tasks.get(taskId);
        task.setTaskName(updatedTask.getTaskName());
        task.setDueDate(updatedTask.getDueDate());

        planRepo.save(plan);

        return new ResponseEntity<>(task, HttpStatus.OK);
    }
    // PlanController.java

    @GetMapping("/{userId}/getAll")
    public ResponseEntity<?> getAllPlans(@PathVariable String userId) {
        User isUserExist = userService.findById(userId);
        if (isUserExist == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Plan plan = isUserExist.getTodoList();
        return new ResponseEntity<>(plan, HttpStatus.OK);
    }

}
