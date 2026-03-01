package com.cts.auth.mapper;

import com.cts.auth.dto.UserRequestDTO;
import com.cts.auth.dto.UserResponseDTO;
import com.cts.auth.entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-01T14:32:13+0530",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.43.0.v20250819-1513, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserResponseDTO toResponseDTO(User entity) {
        if ( entity == null ) {
            return null;
        }

        UserResponseDTO.UserResponseDTOBuilder userResponseDTO = UserResponseDTO.builder();

        userResponseDTO.createdAt( entity.getCreatedAt() );
        userResponseDTO.email( entity.getEmail() );
        userResponseDTO.isActive( entity.getIsActive() );
        userResponseDTO.name( entity.getName() );
        userResponseDTO.phone( entity.getPhone() );
        userResponseDTO.role( entity.getRole() );
        userResponseDTO.userId( entity.getUserId() );

        return userResponseDTO.build();
    }

    @Override
    public User toEntity(UserRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.email( dto.getEmail() );
        user.name( dto.getName() );
        user.password( dto.getPassword() );
        user.phone( dto.getPhone() );
        user.role( dto.getRole() );

        return user.build();
    }

    @Override
    public List<UserResponseDTO> toResponseDTOList(List<User> entities) {
        if ( entities == null ) {
            return null;
        }

        List<UserResponseDTO> list = new ArrayList<UserResponseDTO>( entities.size() );
        for ( User user : entities ) {
            list.add( toResponseDTO( user ) );
        }

        return list;
    }
}
