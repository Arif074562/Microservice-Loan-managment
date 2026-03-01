package com.cts.collections.mapper;

import com.cts.collections.dto.CollectionActionRequestDTO;
import com.cts.collections.dto.CollectionActionResponseDTO;
import com.cts.collections.entity.CollectionAction;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CollectionActionMapper {

    CollectionActionResponseDTO toResponseDTO(CollectionAction entity);

    CollectionAction toEntity(CollectionActionRequestDTO dto);

    List<CollectionActionResponseDTO> toResponseDTOList(List<CollectionAction> entities);
}
