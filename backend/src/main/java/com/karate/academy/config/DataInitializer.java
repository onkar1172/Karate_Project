package com.karate.academy.config;

import com.karate.academy.entity.*;
import com.karate.academy.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final KarateClassRepository karateClassRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // 1. Seed Roles
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseGet(() -> roleRepository.save(Role.builder().name(ERole.ROLE_USER).build()));

        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseGet(() -> roleRepository.save(Role.builder().name(ERole.ROLE_ADMIN).build()));

        // 2. Seed Admin User
        if (!userRepository.existsByEmail("admin@karate.com")) {
            User admin = User.builder()
                    .fullName("Sensei Kenji Takahashi (Admin)")
                    .email("admin@karate.com")
                    .password(passwordEncoder.encode("admin123"))
                    .phone("+1 (555) 019-2831")
                    .roles(Set.of(adminRole, userRole))
                    .build();
            userRepository.save(admin);
        }

        // 3. Seed Sample Students
        if (!userRepository.existsByEmail("john.doe@karate.com")) {
            User user1 = User.builder()
                    .fullName("John Doe")
                    .email("john.doe@karate.com")
                    .password(passwordEncoder.encode("student123"))
                    .phone("+1 (555) 234-5678")
                    .roles(Set.of(userRole))
                    .build();
            User savedUser1 = userRepository.save(user1);

            Student student1 = Student.builder()
                    .user(savedUser1)
                    .beltRank("Brown Belt (2nd Kyu)")
                    .dojoBranch("Central Honbu Dojo")
                    .emergencyContact("Jane Doe (+1 555-999-1111)")
                    .age(24)
                    .status("ACTIVE")
                    .joinDate(LocalDate.now().minusMonths(14))
                    .achievements("Gold Medalist - 2025 Regional Kata Championship")
                    .build();
            studentRepository.save(student1);
        }

        if (!userRepository.existsByEmail("sarah.connor@karate.com")) {
            User user2 = User.builder()
                    .fullName("Sarah Connor")
                    .email("sarah.connor@karate.com")
                    .password(passwordEncoder.encode("student123"))
                    .phone("+1 (555) 345-6789")
                    .roles(Set.of(userRole))
                    .build();
            User savedUser2 = userRepository.save(user2);

            Student student2 = Student.builder()
                    .user(savedUser2)
                    .beltRank("Black Belt (1st Dan)")
                    .dojoBranch("Downtown Dojo")
                    .emergencyContact("Kyle Reese (+1 555-888-2222)")
                    .age(29)
                    .status("ACTIVE")
                    .joinDate(LocalDate.now().minusYears(3))
                    .achievements("Certified Assistant Instructor, National Kumite Finalist")
                    .build();
            studentRepository.save(student2);
        }

        if (!userRepository.existsByEmail("alex.rivera@karate.com")) {
            User user3 = User.builder()
                    .fullName("Alex Rivera")
                    .email("alex.rivera@karate.com")
                    .password(passwordEncoder.encode("student123"))
                    .phone("+1 (555) 456-7890")
                    .roles(Set.of(userRole))
                    .build();
            User savedUser3 = userRepository.save(user3);

            Student student3 = Student.builder()
                    .user(savedUser3)
                    .beltRank("Green Belt (6th Kyu)")
                    .dojoBranch("Westside Dojo")
                    .emergencyContact("Maria Rivera (+1 555-777-3333)")
                    .age(19)
                    .status("ACTIVE")
                    .joinDate(LocalDate.now().minusMonths(6))
                    .achievements("Student of the Month - August 2026")
                    .build();
            studentRepository.save(student3);
        }

        // 4. Seed Karate Classes
        if (karateClassRepository.count() == 0) {
            KarateClass class1 = KarateClass.builder()
                    .title("Foundational Kata & Stances")
                    .description("Master basic Kihon stances (Zenkutsu-dachi, Kokutsu-dachi) and fundamental Katas (Heian Shodan & Nidan). Perfect for beginners and yellow belts.")
                    .instructorName("Shihan Hiroshi Tanaka")
                    .beltLevelRequired("White to Yellow Belt")
                    .maxCapacity(20)
                    .currentCapacity(2)
                    .scheduleTime("Mon, Wed 06:00 PM - 07:30 PM EST")
                    .imageUrl("https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80")
                    .fee(new BigDecimal("49.99"))
                    .build();
            karateClassRepository.save(class1);

            KarateClass class2 = KarateClass.builder()
                    .title("Dynamic Kumite & Sparring Tactics")
                    .description("Advanced footwork, distance management, point-scoring strikes, and defensive sweeps for tournament and practical sparring application.")
                    .instructorName("Sensei Kenji Takahashi")
                    .beltLevelRequired("Green Belt and Above")
                    .maxCapacity(15)
                    .currentCapacity(1)
                    .scheduleTime("Tue, Thu 07:00 PM - 08:30 PM EST")
                    .imageUrl("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80")
                    .fee(new BigDecimal("69.99"))
                    .build();
            karateClassRepository.save(class2);

            KarateClass class3 = KarateClass.builder()
                    .title("Black Belt Mastery: Advanced Bunkai & Self Defense")
                    .description("In-depth analysis of advanced kata applications (Bunkai), joint locks, pressure points, and real-world self-defense counter techniques.")
                    .instructorName("Grandmaster Masao Sato")
                    .beltLevelRequired("Brown to Black Belt")
                    .maxCapacity(12)
                    .currentCapacity(1)
                    .scheduleTime("Sat 10:00 AM - 12:00 PM EST")
                    .imageUrl("https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80")
                    .fee(new BigDecimal("89.99"))
                    .build();
            karateClassRepository.save(class3);

            KarateClass class4 = KarateClass.builder()
                    .title("Okinawan Kobudo Weaponry (Bo & Sai)")
                    .description("Traditional Okinawan Kobudo training focusing on the Bo staff and Sai daggers. Enhances balance, coordination, and forearm conditioning.")
                    .instructorName("Sensei Elena Rostova")
                    .beltLevelRequired("Intermediate & Advanced")
                    .maxCapacity(15)
                    .currentCapacity(0)
                    .scheduleTime("Sun 11:00 AM - 01:00 PM EST")
                    .imageUrl("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80")
                    .fee(new BigDecimal("59.99"))
                    .build();
            karateClassRepository.save(class4);

            // 5. Seed Enrollments
            User john = userRepository.findByEmail("john.doe@karate.com").orElse(null);
            User sarah = userRepository.findByEmail("sarah.connor@karate.com").orElse(null);
            User alex = userRepository.findByEmail("alex.rivera@karate.com").orElse(null);

            if (john != null) {
                enrollmentRepository.save(Enrollment.builder()
                        .user(john)
                        .karateClass(class2)
                        .status("ENROLLED")
                        .progressPercentage(45)
                        .build());
                enrollmentRepository.save(Enrollment.builder()
                        .user(john)
                        .karateClass(class1)
                        .status("COMPLETED")
                        .progressPercentage(100)
                        .build());
            }

            if (sarah != null) {
                enrollmentRepository.save(Enrollment.builder()
                        .user(sarah)
                        .karateClass(class3)
                        .status("ENROLLED")
                        .progressPercentage(80)
                        .build());
            }

            if (alex != null) {
                enrollmentRepository.save(Enrollment.builder()
                        .user(alex)
                        .karateClass(class1)
                        .status("ENROLLED")
                        .progressPercentage(25)
                        .build());
            }
        }
    }
}
