package com.adminpulse.config;

import com.adminpulse.model.Activity;
import com.adminpulse.model.Admin;
import com.adminpulse.model.User;
import com.adminpulse.repository.ActivityRepository;
import com.adminpulse.repository.AdminRepository;
import com.adminpulse.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Loads sample data on first run (when database is empty).
 * Helpful for demos and local development.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;

    public DataInitializer(AdminRepository adminRepository, UserRepository userRepository,
                           ActivityRepository activityRepository) {
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
        this.activityRepository = activityRepository;
    }

    @Override
    public void run(String... args) {
        if (adminRepository.count() == 0) {
            Admin admin = new Admin();
            admin.setName("Akash");
            admin.setEmail("admin@adminpulse.com");
            admin.setPassword("admin123");
            admin.setDepartment("IT Administration");
            adminRepository.save(admin);
        } else {
            adminRepository.findByEmail("admin@adminpulse.com").ifPresent(admin -> {
                if (!"Akash".equals(admin.getName())) {
                    admin.setName("Akash");
                    adminRepository.save(admin);
                }
            });
        }

        if (userRepository.count() == 0) {
            userRepository.save(createUser("Rahul Sharma", "rahul@example.com", "Admin", "Active"));
            userRepository.save(createUser("Priya Patel", "priya@example.com", "Editor", "Active"));
            userRepository.save(createUser("Amit Kumar", "amit@example.com", "User", "Inactive"));
            userRepository.save(createUser("Sneha Reddy", "sneha@example.com", "User", "Active"));
            userRepository.save(createUser("Vikram Singh", "vikram@example.com", "Moderator", "Active"));
        }

        if (activityRepository.count() == 0) {
            activityRepository.save(createActivity("Admin logged into dashboard", "auth"));
            activityRepository.save(createActivity("New user Rahul Sharma was added", "user"));
            activityRepository.save(createActivity("Monthly revenue report generated", "report"));
        }
    }

    private User createUser(String name, String email, String role, String status) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setRole(role);
        user.setStatus(status);
        return user;
    }

    private Activity createActivity(String description, String type) {
        Activity activity = new Activity();
        activity.setDescription(description);
        activity.setType(type);
        return activity;
    }
}
