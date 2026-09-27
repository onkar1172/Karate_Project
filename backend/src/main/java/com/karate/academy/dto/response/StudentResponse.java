package com.karate.academy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentResponse {
    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private String phone;
    private String beltRank;
    private String dojoBranch;
    private String emergencyContact;
    private Integer age;
    private String status;
    private LocalDate joinDate;
    private String achievements;
}
