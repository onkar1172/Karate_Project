package com.karate.academy.repository;

import com.karate.academy.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByUserId(Long userId);
    Optional<Student> findByUserEmail(String email);

    @Query("SELECT s FROM Student s WHERE LOWER(s.user.fullName) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(s.user.email) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(s.beltRank) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(s.dojoBranch) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Student> searchStudents(String query);

    Long countByStatus(String status);
}
