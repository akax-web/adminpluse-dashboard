package com.adminpulse.controller;

import com.adminpulse.model.Admin;
import com.adminpulse.service.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        return authService.login(email, password);
    }

    @GetMapping("/profile")
    public Admin getProfile(@RequestParam String email) {
        return authService.getAdminProfile(email);
    }
}
