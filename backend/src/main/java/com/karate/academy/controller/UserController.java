package com.karate.academy.controller;

import com.karate.academy.dto.request.UpdateProfileRequest;
import com.karate.academy.dto.response.UserProfileResponse;
import com.karate.academy.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // View ONLY current user's profile
    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getCurrentUserProfile() {
        return ResponseEntity.ok(userService.getCurrentUserProfile());
    }

    // Update current user's profile
    @PutMapping("/me")
    public ResponseEntity<UserProfileResponse> updateCurrentUserProfile(@Valid @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(userService.updateCurrentUserProfile(request));
    }

    // Admin endpoint: View all users
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserProfileResponse>> getAllUsersForAdmin() {
        return ResponseEntity.ok(userService.getAllUsersForAdmin());
    }

    // Admin endpoint: View user by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserProfileResponse> getUserByIdForAdmin(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserByIdForAdmin(id));
    }
}
