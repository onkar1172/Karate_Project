package com.karate.academy.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StudentRequest {
    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String phone;
    
    @NotBlank(message = "Belt rank is required")
    private String beltRank;

    private String dojoBranch;
    private String emergencyContact;
    private Integer age;
    private String status;
    private String achievements;
}
