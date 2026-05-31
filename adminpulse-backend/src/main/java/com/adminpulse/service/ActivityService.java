package com.adminpulse.service;

import com.adminpulse.model.Activity;
import com.adminpulse.repository.ActivityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public List<Activity> getRecentActivities() {
        return activityRepository.findTop10ByOrderByCreatedAtDesc();
    }

    public Activity logActivity(String description, String type) {
        Activity activity = new Activity();
        activity.setDescription(description);
        activity.setType(type);
        return activityRepository.save(activity);
    }
}
