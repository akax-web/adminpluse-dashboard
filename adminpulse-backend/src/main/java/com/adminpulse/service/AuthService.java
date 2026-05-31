package com.adminpulse.service;

import com.adminpulse.model.Admin;
import com.adminpulse.repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

/**
 * Basic login for learning purposes.
 * In production you would use JWT + password hashing (BCrypt).
 */
@Service
public class AuthService {

    private final AdminRepository adminRepository;

    public AuthService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Map<String, Object> login(String email, String password) {
        Optional<Admin> adminOpt = adminRepository.findByEmail(email);

        if (adminOpt.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }

        Admin admin = adminOpt.get();

        // Simple plain-text check for demo (student project level)
        if (!admin.getPassword().equals(password)) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = UUID.randomUUID().toString();

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("adminName", admin.getName());
        response.put("adminEmail", admin.getEmail());
        response.put("message", "Login successful");

        return response;
    }

    public Admin getAdminProfile(String email) {
        return adminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
    }
}
