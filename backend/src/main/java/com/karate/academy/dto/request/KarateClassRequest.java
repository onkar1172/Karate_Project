package com.karate.academy.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class KarateClassRequest {
    @NotBlank(message = "Class title is required")
    private String title;

    private String description;

    @NotBlank(message = "Instructor name is required")
    private String instructorName;

    private String beltLevelRequired;
    private Integer maxCapacity;
    private String scheduleTime;
    private String imageUrl;
    private BigDecimal fee;
}
