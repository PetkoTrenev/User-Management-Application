package com.example.usermanagement.rest.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserResponseDTO
{
    private List<UserInfoDTO> users;
    private Long totalElements;
    private Integer totalPages;
}
