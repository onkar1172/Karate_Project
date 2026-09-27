package com.karate.academy.service;

import com.karate.academy.config.jwt.UserDetailsImpl;
import com.karate.academy.dto.request.UpdateProfileRequest;
import com.karate.academy.dto.response.UserProfileResponse;
import com.karate.academy.entity.Student;
import com.karate.academy.entity.User;
import com.karate.academy.exception.ResourceNotFoundException;
import com.karate.academy.repository.StudentRepository;
import com.karate.academy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;

    public UserProfileResponse getCurrentUserProfile() {
        UserDetailsImpl currentUser = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + currentUser.getEmail()));

        return buildUserProfileResponse(user);
    }

    @Transactional
    public UserProfileResponse updateCurrentUserProfile(UpdateProfileRequest request) {
        UserDetailsImpl currentUser = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(currentUser.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + currentUser.getEmail()));

        user.setFullName(request.getFullName());
        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }
        userRepository.save(user);

        Optional<Student> studentOpt = studentRepository.findByUserId(user.getId());
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            if (request.getDojoBranch() != null) student.setDojoBranch(request.getDojoBranch());
            if (request.getEmergencyContact() != null) student.setEmergencyContact(request.getEmergencyContact());
            if (request.getAge() != null) student.setAge(request.getAge());
            studentRepository.save(student);
        }

        return buildUserProfileResponse(user);
    }

    // Admin method to get any user by id
    public UserProfileResponse getUserByIdForAdmin(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return buildUserProfileResponse(user);
    }

    public List<UserProfileResponse> getAllUsersForAdmin() {
        return userRepository.findAll().stream()
                .map(this::buildUserProfileResponse)
                .collect(Collectors.toList());
    }

    private UserProfileResponse buildUserProfileResponse(User user) {
        List<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toList());

        Optional<Student> studentOpt = studentRepository.findByUserId(user.getId());

        UserProfileResponse.UserProfileResponseBuilder builder = UserProfileResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .roles(roles)
                .createdAt(user.getCreatedAt());

        if (studentOpt.isPresent()) {
            Student s = studentOpt.get();
            builder.studentId(s.getId())
                    .beltRank(s.getBeltRank())
                    .dojoBranch(s.getDojoBranch())
                    .emergencyContact(s.getEmergencyContact())
                    .age(s.getAge())
                    .status(s.getStatus())
                    .joinDate(s.getJoinDate())
                    .achievements(s.getAchievements());
        }

        return builder.build();
    }
}
