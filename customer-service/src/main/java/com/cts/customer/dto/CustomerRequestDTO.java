package com.cts.customer.dto;

import com.cts.customer.enums.CustomerSegment;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Date of birth is required")
    private LocalDate dob;

    private String contactInfo;

    @NotNull(message = "Segment is required")
    private CustomerSegment segment;
}
