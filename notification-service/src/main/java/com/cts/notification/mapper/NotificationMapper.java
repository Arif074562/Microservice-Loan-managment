package com.cts.notification.mapper;

import com.cts.notification.dto.NotificationRequestDTO;
import com.cts.notification.dto.NotificationResponseDTO;
import com.cts.notification.entity.Notification;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    NotificationResponseDTO toResponseDTO(Notification entity);

    Notification toEntity(NotificationRequestDTO dto);

    List<NotificationResponseDTO> toResponseDTOList(List<Notification> entities);
}
