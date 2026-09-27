package com.karate.academy.repository;

import com.karate.academy.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUserId(Long userId);
    List<Enrollment> findByKarateClassId(Long classId);
    Optional<Enrollment> findByUserIdAndKarateClassId(Long userId, Long classId);
    Boolean existsByUserIdAndKarateClassId(Long userId, Long classId);
}
