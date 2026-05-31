package com.adminpulse.controller;

import com.adminpulse.model.Activity;
import com.adminpulse.service.ActivityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "http://localhost:5173")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping
    public List<Activity> getRecentActivities() {
        return activityService.getRecentActivities();
    }
}
