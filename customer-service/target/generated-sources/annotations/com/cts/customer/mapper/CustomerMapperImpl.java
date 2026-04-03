package com.cts.customer.mapper;

import com.cts.customer.dto.CustomerRequestDTO;
import com.cts.customer.dto.CustomerResponseDTO;
import com.cts.customer.entity.Customer;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-03T08:29:16+0530",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class CustomerMapperImpl implements CustomerMapper {

    @Override
    public CustomerResponseDTO toResponseDTO(Customer entity) {
        if ( entity == null ) {
            return null;
        }

        CustomerResponseDTO.CustomerResponseDTOBuilder customerResponseDTO = CustomerResponseDTO.builder();

        customerResponseDTO.contactInfo( entity.getContactInfo() );
        customerResponseDTO.createdAt( entity.getCreatedAt() );
        customerResponseDTO.customerId( entity.getCustomerId() );
        customerResponseDTO.dob( entity.getDob() );
        customerResponseDTO.kycStatus( entity.getKycStatus() );
        customerResponseDTO.name( entity.getName() );
        customerResponseDTO.segment( entity.getSegment() );
        customerResponseDTO.status( entity.getStatus() );
        customerResponseDTO.updatedAt( entity.getUpdatedAt() );

        return customerResponseDTO.build();
    }

    @Override
    public Customer toEntity(CustomerRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Customer.CustomerBuilder customer = Customer.builder();

        customer.contactInfo( dto.getContactInfo() );
        customer.dob( dto.getDob() );
        customer.name( dto.getName() );
        customer.segment( dto.getSegment() );

        return customer.build();
    }

    @Override
    public List<CustomerResponseDTO> toResponseDTOList(List<Customer> entities) {
        if ( entities == null ) {
            return null;
        }

        List<CustomerResponseDTO> list = new ArrayList<CustomerResponseDTO>( entities.size() );
        for ( Customer customer : entities ) {
            list.add( toResponseDTO( customer ) );
        }

        return list;
    }
}
