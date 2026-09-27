package com.karate.academy.service;

import com.karate.academy.config.jwt.UserDetailsImpl;
import com.karate.academy.dto.request.KarateClassRequest;
import com.karate.academy.dto.response.KarateClassResponse;
import com.karate.academy.entity.KarateClass;
import com.karate.academy.exception.ResourceNotFoundException;
import com.karate.academy.repository.EnrollmentRepository;
import com.karate.academy.repository.KarateClassRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KarateClassService {

    private final KarateClassRepository karateClassRepository;
    private final EnrollmentRepository enrollmentRepository;

    public List<KarateClassResponse> getAllClasses() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long currentUserId = null;
        if (auth != null && auth.getPrincipal() instanceof UserDetailsImpl) {
            currentUserId = ((UserDetailsImpl) auth.getPrincipal()).getId();
        }

        final Long userId = currentUserId;
        return karateClassRepository.findAll().stream()
                .map(kc -> mapToResponse(kc, userId))
                .collect(Collectors.toList());
    }

    public KarateClassResponse getClassById(Long id) {
        KarateClass karateClass = karateClassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Karate class not found with id: " + id));

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long currentUserId = null;
        if (auth != null && auth.getPrincipal() instanceof UserDetailsImpl) {
            currentUserId = ((UserDetailsImpl) auth.getPrincipal()).getId();
        }

        return mapToResponse(karateClass, currentUserId);
    }

    @Transactional
    public KarateClassResponse createClass(KarateClassRequest request) {
        KarateClass karateClass = KarateClass.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .instructorName(request.getInstructorName())
                .beltLevelRequired(request.getBeltLevelRequired() != null ? request.getBeltLevelRequired() : "All Levels")
                .maxCapacity(request.getMaxCapacity() != null ? request.getMaxCapacity() : 25)
                .currentCapacity(0)
                .scheduleTime(request.getScheduleTime())
                .imageUrl(request.getImageUrl())
                .fee(request.getFee())
                .build();

        KarateClass saved = karateClassRepository.save(karateClass);
        return mapToResponse(saved, null);
    }

    @Transactional
    public KarateClassResponse updateClass(Long id, KarateClassRequest request) {
        KarateClass karateClass = karateClassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Karate class not found with id: " + id));

        karateClass.setTitle(request.getTitle());
        karateClass.setDescription(request.getDescription());
        karateClass.setInstructorName(request.getInstructorName());
        if (request.getBeltLevelRequired() != null) karateClass.setBeltLevelRequired(request.getBeltLevelRequired());
        if (request.getMaxCapacity() != null) karateClass.setMaxCapacity(request.getMaxCapacity());
        if (request.getScheduleTime() != null) karateClass.setScheduleTime(request.getScheduleTime());
        if (request.getImageUrl() != null) karateClass.setImageUrl(request.getImageUrl());
        if (request.getFee() != null) karateClass.setFee(request.getFee());

        KarateClass updated = karateClassRepository.save(karateClass);
        return mapToResponse(updated, null);
    }

    @Transactional
    public void deleteClass(Long id) {
        KarateClass karateClass = karateClassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Karate class not found with id: " + id));

        // Remove enrollments for this class
        enrollmentRepository.findByKarateClassId(id)
                .forEach(enrollmentRepository::delete);

        karateClassRepository.delete(karateClass);
    }

    private KarateClassResponse mapToResponse(KarateClass kc, Long userId) {
        boolean isEnrolled = false;
        if (userId != null) {
            isEnrolled = enrollmentRepository.existsByUserIdAndKarateClassId(userId, kc.getId());
        }

        return KarateClassResponse.builder()
                .id(kc.getId())
                .title(kc.getTitle())
                .description(kc.getDescription())
                .instructorName(kc.getInstructorName())
                .beltLevelRequired(kc.getBeltLevelRequired())
                .maxCapacity(kc.getMaxCapacity())
                .currentCapacity(kc.getCurrentCapacity())
                .scheduleTime(kc.getScheduleTime())
                .imageUrl(kc.getImageUrl())
                .fee(kc.getFee())
                .isEnrolled(isEnrolled)
                .build();
    }
}
