package com.cts.customer.mapper;

import com.cts.customer.dto.DocumentRequestDTO;
import com.cts.customer.dto.DocumentResponseDTO;
import com.cts.customer.entity.Document;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DocumentMapper {

    DocumentResponseDTO toResponseDTO(Document entity);

    Document toEntity(DocumentRequestDTO dto);

    List<DocumentResponseDTO> toResponseDTOList(List<Document> entities);
}
