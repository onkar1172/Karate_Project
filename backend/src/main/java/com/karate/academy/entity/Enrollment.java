package com.karate.academy.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "class_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "class_id", nullable = false)
    private KarateClass karateClass;

    @Column(nullable = false)
    private String status; // ENROLLED, COMPLETED, CANCELLED

    @Column(name = "enrolled_at")
    private LocalDateTime enrolledAt;

    @Column(name = "progress_percentage")
    @Builder.Default
    private Integer progressPercentage = 0;

    @PrePersist
    protected void onCreate() {
        this.enrolledAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = "ENROLLED";
        }
    }
}
