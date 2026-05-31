package com.adminpulse.controller;

import com.adminpulse.model.User;
import com.adminpulse.service.ActivityService;
import com.adminpulse.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final ActivityService activityService;

    public UserController(UserService userService, ActivityService activityService) {
        this.userService = userService;
        this.activityService = activityService;
    }

    @GetMapping
    public List<User> getUsers(@RequestParam(required = false) String search) {
        if (search != null && !search.isBlank()) {
            return userService.searchUsers(search);
        }
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        User saved = userService.createUser(user);
        activityService.logActivity("New user added: " + saved.getName(), "user");
        return saved;
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        User updated = userService.updateUser(id, user);
        activityService.logActivity("User updated: " + updated.getName(), "user");
        return updated;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        activityService.logActivity("User deleted (id: " + id + ")", "user");
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }
}
