package com.karate.academy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentResponse {
    private Long id;
    private Long userId;
    private String studentName;
    private String studentEmail;
    private Long classId;
    private String classTitle;
    private String instructorName;
    private String scheduleTime;
    private String status;
    private LocalDateTime enrolledAt;
    private Integer progressPercentage;
}
