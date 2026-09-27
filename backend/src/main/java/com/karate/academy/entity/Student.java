package com.karate.academy.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(name = "belt_rank", nullable = false)
    private String beltRank; // White, Yellow, Orange, Green, Blue, Purple, Brown, Black

    @Column(name = "dojo_branch")
    private String dojoBranch;

    @Column(name = "emergency_contact")
    private String emergencyContact;

    private Integer age;

    @Column(nullable = false)
    private String status; // ACTIVE, INACTIVE, SUSPENDED

    @Column(name = "join_date")
    private LocalDate joinDate;

    @Column(length = 500)
    private String achievements;

    @PrePersist
    protected void onCreate() {
        if (this.joinDate == null) {
            this.joinDate = LocalDate.now();
        }
        if (this.status == null) {
            this.status = "ACTIVE";
        }
        if (this.beltRank == null) {
            this.beltRank = "White Belt (10th Kyu)";
        }
    }
}
