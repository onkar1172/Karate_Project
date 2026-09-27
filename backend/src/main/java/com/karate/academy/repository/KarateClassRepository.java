package com.karate.academy.repository;

import com.karate.academy.entity.KarateClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KarateClassRepository extends JpaRepository<KarateClass, Long> {
    List<KarateClass> findByBeltLevelRequiredContainingIgnoreCase(String beltLevel);
}
