package com.karate.academy.controller;

import com.karate.academy.dto.request.KarateClassRequest;
import com.karate.academy.dto.response.KarateClassResponse;
import com.karate.academy.dto.response.MessageResponse;
import com.karate.academy.service.KarateClassService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/classes")
@RequiredArgsConstructor
public class KarateClassController {

    private final KarateClassService karateClassService;

    // Public: List all classes
    @GetMapping
    public ResponseEntity<List<KarateClassResponse>> getAllClasses() {
        return ResponseEntity.ok(karateClassService.getAllClasses());
    }

    // Public: Get class details
    @GetMapping("/{id}")
    public ResponseEntity<KarateClassResponse> getClassById(@PathVariable Long id) {
        return ResponseEntity.ok(karateClassService.getClassById(id));
    }

    // Admin: Create new class
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<KarateClassResponse> createClass(@Valid @RequestBody KarateClassRequest request) {
        return new ResponseEntity<>(karateClassService.createClass(request), HttpStatus.CREATED);
    }

    // Admin: Update class
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<KarateClassResponse> updateClass(@PathVariable Long id, @Valid @RequestBody KarateClassRequest request) {
        return ResponseEntity.ok(karateClassService.updateClass(id, request));
    }

    // Admin: Delete class
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> deleteClass(@PathVariable Long id) {
        karateClassService.deleteClass(id);
        return ResponseEntity.ok(new MessageResponse("Karate class deleted successfully"));
    }
}
