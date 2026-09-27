package com.karate.academy.controller;

import com.karate.academy.dto.response.EnrollmentResponse;
import com.karate.academy.dto.response.MessageResponse;
import com.karate.academy.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    // Student: Enroll in class
    @PostMapping("/class/{classId}")
    public ResponseEntity<EnrollmentResponse> enrollUserInClass(@PathVariable Long classId) {
        return new ResponseEntity<>(enrollmentService.enrollUserInClass(classId), HttpStatus.CREATED);
    }

    // Student: Get own enrollments
    @GetMapping("/my")
    public ResponseEntity<List<EnrollmentResponse>> getMyEnrollments() {
        return ResponseEntity.ok(enrollmentService.getMyEnrollments());
    }

    // Admin: Get all enrollments
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<EnrollmentResponse>> getAllEnrollmentsForAdmin() {
        return ResponseEntity.ok(enrollmentService.getAllEnrollmentsForAdmin());
    }

    // Cancel enrollment
    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> cancelEnrollment(@PathVariable Long id) {
        enrollmentService.cancelEnrollment(id);
        return ResponseEntity.ok(new MessageResponse("Enrollment cancelled successfully"));
    }
}
