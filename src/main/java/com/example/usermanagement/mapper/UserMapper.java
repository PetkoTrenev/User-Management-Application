package com.example.usermanagement.mapper;

import com.example.usermanagement.model.User;
import com.example.usermanagement.rest.dto.UserInfoDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper
{
    User userInfoDTOtoUser(UserInfoDTO userInfoDTO);

    UserInfoDTO userToUserInfoDTO(User user);
}
