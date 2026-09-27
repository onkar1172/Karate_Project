package com.karate.academy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KarateClassResponse {
    private Long id;
    private String title;
    private String description;
    private String instructorName;
    private String beltLevelRequired;
    private Integer maxCapacity;
    private Integer currentCapacity;
    private String scheduleTime;
    private String imageUrl;
    private BigDecimal fee;
    private Boolean isEnrolled;
}
