package com.cts.disbursement.mapper;

import com.cts.disbursement.dto.DisbursementRequestDTO;
import com.cts.disbursement.dto.DisbursementResponseDTO;
import com.cts.disbursement.entity.Disbursement;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-01T14:13:19+0530",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.43.0.v20250819-1513, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class DisbursementMapperImpl implements DisbursementMapper {

    @Override
    public DisbursementResponseDTO toResponseDTO(Disbursement entity) {
        if ( entity == null ) {
            return null;
        }

        DisbursementResponseDTO.DisbursementResponseDTOBuilder disbursementResponseDTO = DisbursementResponseDTO.builder();

        disbursementResponseDTO.amount( entity.getAmount() );
        disbursementResponseDTO.applicationId( entity.getApplicationId() );
        disbursementResponseDTO.disbursementDate( entity.getDisbursementDate() );
        disbursementResponseDTO.disbursementId( entity.getDisbursementId() );
        disbursementResponseDTO.status( entity.getStatus() );

        return disbursementResponseDTO.build();
    }

    @Override
    public Disbursement toEntity(DisbursementRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Disbursement.DisbursementBuilder disbursement = Disbursement.builder();

        disbursement.amount( dto.getAmount() );
        disbursement.applicationId( dto.getApplicationId() );
        disbursement.disbursementDate( dto.getDisbursementDate() );

        return disbursement.build();
    }

    @Override
    public List<DisbursementResponseDTO> toResponseDTOList(List<Disbursement> entities) {
        if ( entities == null ) {
            return null;
        }

        List<DisbursementResponseDTO> list = new ArrayList<DisbursementResponseDTO>( entities.size() );
        for ( Disbursement disbursement : entities ) {
            list.add( toResponseDTO( disbursement ) );
        }

        return list;
    }
}
