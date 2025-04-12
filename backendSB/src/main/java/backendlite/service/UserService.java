package backendlite.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backendlite.model.User;
import backendlite.repository.UserRepo;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User creatUser(User user) {
        return userRepo.save(user);
    }

    public User findUserByEmail(String email) {
        return userRepo.findUserByEmail(email);
    }

    public User findById(String userId) {
        return userRepo.findById(userId);
    }

}
