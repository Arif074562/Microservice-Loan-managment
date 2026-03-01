package com.cts.customer.mapper;

import com.cts.customer.dto.LoanApplicationRequestDTO;
import com.cts.customer.dto.LoanApplicationResponseDTO;
import com.cts.customer.entity.LoanApplication;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-01T14:13:14+0530",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.43.0.v20250819-1513, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class LoanApplicationMapperImpl implements LoanApplicationMapper {

    @Override
    public LoanApplicationResponseDTO toResponseDTO(LoanApplication entity) {
        if ( entity == null ) {
            return null;
        }

        LoanApplicationResponseDTO.LoanApplicationResponseDTOBuilder loanApplicationResponseDTO = LoanApplicationResponseDTO.builder();

        loanApplicationResponseDTO.applicationDate( entity.getApplicationDate() );
        loanApplicationResponseDTO.applicationId( entity.getApplicationId() );
        loanApplicationResponseDTO.createdAt( entity.getCreatedAt() );
        loanApplicationResponseDTO.customerId( entity.getCustomerId() );
        loanApplicationResponseDTO.productId( entity.getProductId() );
        loanApplicationResponseDTO.requestedAmount( entity.getRequestedAmount() );
        loanApplicationResponseDTO.status( entity.getStatus() );
        loanApplicationResponseDTO.tenureMonths( entity.getTenureMonths() );
        loanApplicationResponseDTO.updatedAt( entity.getUpdatedAt() );

        return loanApplicationResponseDTO.build();
    }

    @Override
    public LoanApplication toEntity(LoanApplicationRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        LoanApplication.LoanApplicationBuilder loanApplication = LoanApplication.builder();

        loanApplication.customerId( dto.getCustomerId() );
        loanApplication.productId( dto.getProductId() );
        loanApplication.requestedAmount( dto.getRequestedAmount() );
        loanApplication.tenureMonths( dto.getTenureMonths() );

        return loanApplication.build();
    }

    @Override
    public List<LoanApplicationResponseDTO> toResponseDTOList(List<LoanApplication> entities) {
        if ( entities == null ) {
            return null;
        }

        List<LoanApplicationResponseDTO> list = new ArrayList<LoanApplicationResponseDTO>( entities.size() );
        for ( LoanApplication loanApplication : entities ) {
            list.add( toResponseDTO( loanApplication ) );
        }

        return list;
    }
}
