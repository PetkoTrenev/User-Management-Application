package com.example.usermanagement.rest.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Pattern;
import java.time.LocalDate;

@Data
@Builder
public class UserInfoDTO
{
    private String firstName;
    private String lastName;

    @Pattern(regexp = "^[0-9?A-z0-9?]+(\\.)?[0-9?A-z0-9?]+@[A-z]+\\.[A-z]{3}.?[A-z]{0,3}$")
    private String email;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;
}
