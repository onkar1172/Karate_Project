package com.karate.academy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponse {
    private Long id;
    private String email;
    private String fullName;
    private String phone;
    private List<String> roles;
    private LocalDateTime createdAt;
    
    // Student specific profile details
    private Long studentId;
    private String beltRank;
    private String dojoBranch;
    private String emergencyContact;
    private Integer age;
    private String status;
    private LocalDate joinDate;
    private String achievements;
}
