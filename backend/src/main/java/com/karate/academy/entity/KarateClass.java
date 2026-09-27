package com.karate.academy.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "karate_classes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KarateClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(name = "instructor_name", nullable = false)
    private String instructorName;

    @Column(name = "belt_level_required")
    private String beltLevelRequired;

    @Column(name = "max_capacity")
    private Integer maxCapacity;

    @Column(name = "current_capacity")
    @Builder.Default
    private Integer currentCapacity = 0;

    @Column(name = "schedule_time")
    private String scheduleTime;

    @Column(name = "image_url")
    private String imageUrl;

    private BigDecimal fee;
}
