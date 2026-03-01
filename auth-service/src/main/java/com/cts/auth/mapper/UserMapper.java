package com.cts.auth.mapper;

import com.cts.auth.dto.UserRequestDTO;
import com.cts.auth.dto.UserResponseDTO;
import com.cts.auth.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponseDTO toResponseDTO(User entity);

    User toEntity(UserRequestDTO dto);

    List<UserResponseDTO> toResponseDTOList(List<User> entities);
}
