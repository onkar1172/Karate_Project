package com.karate.academy.controller;

import com.karate.academy.dto.request.StudentRequest;
import com.karate.academy.dto.response.DashboardStatsResponse;
import com.karate.academy.dto.response.MessageResponse;
import com.karate.academy.dto.response.StudentResponse;
import com.karate.academy.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    // Normal user: Get own student profile only
    @GetMapping("/me")
    public ResponseEntity<StudentResponse> getMyStudentProfile() {
        return ResponseEntity.ok(studentService.getMyStudentProfile());
    }

    // Admin: Get all student records (with optional search)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<StudentResponse>> getAllStudents(@RequestParam(required = false) String search) {
        return ResponseEntity.ok(studentService.getAllStudents(search));
    }

    // Admin: Get specific student by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StudentResponse> getStudentById(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    // Admin: Add new student record
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StudentResponse> createStudent(@Valid @RequestBody StudentRequest request) {
        StudentResponse response = studentService.createStudent(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Admin: Update student record
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StudentResponse> updateStudent(@PathVariable Long id, @Valid @RequestBody StudentRequest request) {
        StudentResponse response = studentService.updateStudent(id, request);
        return ResponseEntity.ok(response);
    }

    // Admin: Delete student record
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok(new MessageResponse("Student record deleted successfully"));
    }

    // Admin: Dashboard stats
    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats() {
        return ResponseEntity.ok(studentService.getDashboardStats());
    }
}
