package com.cts.customer.dto;

import com.cts.customer.enums.CustomerSegment;
import com.cts.customer.enums.CustomerStatus;
import com.cts.customer.enums.KycStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerResponseDTO {

    private Long customerId;
    private String name;
    private LocalDate dob;
    private String contactInfo;
    private KycStatus kycStatus;
    private CustomerSegment segment;
    private CustomerStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
