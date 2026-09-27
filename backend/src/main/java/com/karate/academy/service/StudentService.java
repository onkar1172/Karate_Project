package com.karate.academy.service;

import com.karate.academy.config.jwt.UserDetailsImpl;
import com.karate.academy.dto.request.StudentRequest;
import com.karate.academy.dto.response.DashboardStatsResponse;
import com.karate.academy.dto.response.StudentResponse;
import com.karate.academy.entity.ERole;
import com.karate.academy.entity.Role;
import com.karate.academy.entity.Student;
import com.karate.academy.entity.User;
import com.karate.academy.exception.BadRequestException;
import com.karate.academy.exception.ResourceNotFoundException;
import com.karate.academy.repository.EnrollmentRepository;
import com.karate.academy.repository.KarateClassRepository;
import com.karate.academy.repository.RoleRepository;
import com.karate.academy.repository.StudentRepository;
import com.karate.academy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final KarateClassRepository karateClassRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final PasswordEncoder passwordEncoder;

    // Admin: Get all students
    public List<StudentResponse> getAllStudents(String searchQuery) {
        List<Student> students;
        if (searchQuery != null && !searchQuery.trim().isEmpty()) {
            students = studentRepository.searchStudents(searchQuery.trim());
        } else {
            students = studentRepository.findAll();
        }

        return students.stream()
                .map(this::mapToStudentResponse)
                .collect(Collectors.toList());
    }

    // Admin: Get student by ID
    public StudentResponse getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student record not found with id: " + id));
        return mapToStudentResponse(student);
    }

    // User: Get own student profile only
    public StudentResponse getMyStudentProfile() {
        UserDetailsImpl currentUser = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Student student = studentRepository.findByUserEmail(currentUser.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found for current user"));
        return mapToStudentResponse(student);
    }

    // Admin: Create new Student record
    @Transactional
    public StudentResponse createStudent(StudentRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists: " + request.getEmail());
        }

        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Default USER role not found"));

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode("KaratePass123!")) // Default initial password
                .phone(request.getPhone())
                .roles(Set.of(userRole))
                .build();

        User savedUser = userRepository.save(user);

        Student student = Student.builder()
                .user(savedUser)
                .beltRank(request.getBeltRank())
                .dojoBranch(request.getDojoBranch() != null ? request.getDojoBranch() : "Main Dojo")
                .emergencyContact(request.getEmergencyContact())
                .age(request.getAge())
                .status(request.getStatus() != null ? request.getStatus() : "ACTIVE")
                .achievements(request.getAchievements())
                .build();

        Student savedStudent = studentRepository.save(student);
        return mapToStudentResponse(savedStudent);
    }

    // Admin: Update Student record
    @Transactional
    public StudentResponse updateStudent(Long id, StudentRequest request) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        User user = student.getUser();
        user.setFullName(request.getFullName());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        userRepository.save(user);

        student.setBeltRank(request.getBeltRank());
        if (request.getDojoBranch() != null) student.setDojoBranch(request.getDojoBranch());
        if (request.getEmergencyContact() != null) student.setEmergencyContact(request.getEmergencyContact());
        if (request.getAge() != null) student.setAge(request.getAge());
        if (request.getStatus() != null) student.setStatus(request.getStatus());
        if (request.getAchievements() != null) student.setAchievements(request.getAchievements());

        Student updatedStudent = studentRepository.save(student);
        return mapToStudentResponse(updatedStudent);
    }

    // Admin: Delete Student record
    @Transactional
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        
        User user = student.getUser();
        
        // Delete associated enrollments first
        enrollmentRepository.findByUserId(user.getId())
                .forEach(enrollmentRepository::delete);

        studentRepository.delete(student);
        userRepository.delete(user);
    }

    // Admin: Dashboard stats
    public DashboardStatsResponse getDashboardStats() {
        long totalStudents = studentRepository.count();
        long activeStudents = studentRepository.countByStatus("ACTIVE");
        long totalClasses = karateClassRepository.count();
        long totalEnrollments = enrollmentRepository.count();

        Map<String, Long> beltDistribution = new HashMap<>();
        List<Student> allStudents = studentRepository.findAll();
        for (Student s : allStudents) {
            String belt = s.getBeltRank() != null ? s.getBeltRank() : "White Belt";
            beltDistribution.put(belt, beltDistribution.getOrDefault(belt, 0L) + 1);
        }

        return DashboardStatsResponse.builder()
                .totalStudents(totalStudents)
                .activeStudents(activeStudents)
                .totalClasses(totalClasses)
                .totalEnrollments(totalEnrollments)
                .beltDistribution(beltDistribution)
                .build();
    }

    private StudentResponse mapToStudentResponse(Student student) {
        return StudentResponse.builder()
                .id(student.getId())
                .userId(student.getUser().getId())
                .fullName(student.getUser().getFullName())
                .email(student.getUser().getEmail())
                .phone(student.getUser().getPhone())
                .beltRank(student.getBeltRank())
                .dojoBranch(student.getDojoBranch())
                .emergencyContact(student.getEmergencyContact())
                .age(student.getAge())
                .status(student.getStatus())
                .joinDate(student.getJoinDate())
                .achievements(student.getAchievements())
                .build();
    }
}
