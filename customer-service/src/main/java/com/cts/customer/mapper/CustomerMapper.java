package com.cts.customer.mapper;

import com.cts.customer.dto.CustomerRequestDTO;
import com.cts.customer.dto.CustomerResponseDTO;
import com.cts.customer.entity.Customer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CustomerMapper {

    CustomerResponseDTO toResponseDTO(Customer entity);

    Customer toEntity(CustomerRequestDTO dto);

    List<CustomerResponseDTO> toResponseDTOList(List<Customer> entities);
}
