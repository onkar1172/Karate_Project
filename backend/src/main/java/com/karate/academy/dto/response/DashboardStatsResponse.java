package com.karate.academy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashboardStatsResponse {
    private long totalStudents;
    private long activeStudents;
    private long totalClasses;
    private long totalEnrollments;
    private Map<String, Long> beltDistribution;
}
