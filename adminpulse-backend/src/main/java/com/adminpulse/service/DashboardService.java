package com.adminpulse.service;

import com.adminpulse.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DashboardService {

    private final UserRepository userRepository;

    public DashboardService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Map<String, Object> getDashboardStats() {
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.countByStatus("Active");

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("activeUsers", activeUsers);
        stats.put("newUsers", 12); // sample metric for demo
        stats.put("revenue", 45200);
        stats.put("growth", 8.5);

        return stats;
    }

    /**
     * Sample monthly revenue data for the chart on frontend.
     */
    public List<Map<String, Object>> getRevenueOverview() {
        List<Map<String, Object>> data = new ArrayList<>();

        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun"};
        int[] values = {3200, 4100, 3800, 5200, 4800, 6100};

        for (int i = 0; i < months.length; i++) {
            Map<String, Object> point = new HashMap<>();
            point.put("month", months[i]);
            point.put("revenue", values[i]);
            data.add(point);
        }

        return data;
    }
}
