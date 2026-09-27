package com.karate.academy.service;

import com.karate.academy.config.jwt.UserDetailsImpl;
import com.karate.academy.dto.response.EnrollmentResponse;
import com.karate.academy.entity.Enrollment;
import com.karate.academy.entity.KarateClass;
import com.karate.academy.entity.User;
import com.karate.academy.exception.BadRequestException;
import com.karate.academy.exception.ResourceNotFoundException;
import com.karate.academy.repository.EnrollmentRepository;
import com.karate.academy.repository.KarateClassRepository;
import com.karate.academy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final KarateClassRepository karateClassRepository;
    private final UserRepository userRepository;

    @Transactional
    public EnrollmentResponse enrollUserInClass(Long classId) {
        UserDetailsImpl currentUser = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        KarateClass karateClass = karateClassRepository.findById(classId)
                .orElseThrow(() -> new ResourceNotFoundException("Karate class not found with id: " + classId));

        if (enrollmentRepository.existsByUserIdAndKarateClassId(user.getId(), classId)) {
            throw new BadRequestException("You are already enrolled in this class!");
        }

        if (karateClass.getCurrentCapacity() >= karateClass.getMaxCapacity()) {
            throw new BadRequestException("Class is full! Maximum capacity reached.");
        }

        Enrollment enrollment = Enrollment.builder()
                .user(user)
                .karateClass(karateClass)
                .status("ENROLLED")
                .progressPercentage(10)
                .build();

        // Update class capacity
        karateClass.setCurrentCapacity(karateClass.getCurrentCapacity() + 1);
        karateClassRepository.save(karateClass);

        Enrollment saved = enrollmentRepository.save(enrollment);
        return mapToResponse(saved);
    }

    public List<EnrollmentResponse> getMyEnrollments() {
        UserDetailsImpl currentUser = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return enrollmentRepository.findByUserId(user.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<EnrollmentResponse> getAllEnrollmentsForAdmin() {
        return enrollmentRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void cancelEnrollment(Long enrollmentId) {
        UserDetailsImpl currentUser = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment record not found"));

        // Only owner or admin can cancel
        boolean isAdmin = currentUser.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (!isAdmin && !enrollment.getUser().getId().equals(currentUser.getId())) {
            throw new BadRequestException("You can only cancel your own class enrollments!");
        }

        KarateClass karateClass = enrollment.getKarateClass();
        if (karateClass.getCurrentCapacity() > 0) {
            karateClass.setCurrentCapacity(karateClass.getCurrentCapacity() - 1);
            karateClassRepository.save(karateClass);
        }

        enrollmentRepository.delete(enrollment);
    }

    private EnrollmentResponse mapToResponse(Enrollment e) {
        return EnrollmentResponse.builder()
                .id(e.getId())
                .userId(e.getUser().getId())
                .studentName(e.getUser().getFullName())
                .studentEmail(e.getUser().getEmail())
                .classId(e.getKarateClass().getId())
                .classTitle(e.getKarateClass().getTitle())
                .instructorName(e.getKarateClass().getInstructorName())
                .scheduleTime(e.getKarateClass().getScheduleTime())
                .status(e.getStatus())
                .enrolledAt(e.getEnrolledAt())
                .progressPercentage(e.getProgressPercentage())
                .build();
    }
}
