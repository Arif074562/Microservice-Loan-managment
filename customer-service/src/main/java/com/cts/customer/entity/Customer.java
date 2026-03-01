package com.cts.customer.entity;

import com.cts.customer.enums.CustomerSegment;
import com.cts.customer.enums.CustomerStatus;
import com.cts.customer.enums.KycStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;

    private String name;
    private LocalDate dob;
    private String contactInfo;

    @Enumerated(EnumType.STRING)
    private KycStatus kycStatus;

    @Enumerated(EnumType.STRING)
    private CustomerSegment segment;

    @Enumerated(EnumType.STRING)
    private CustomerStatus status;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
