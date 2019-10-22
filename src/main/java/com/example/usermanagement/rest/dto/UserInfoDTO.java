package com.example.usermanagement.rest.dto;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import com.example.usermanagement.common.constants.ValidationConstants;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfoDTO {
  private Long id;

  @Length( min = 2, message = ValidationConstants.NAME_NUMBER_OF_LETTERS_VALIDATION_ )
  @NotBlank( message = ValidationConstants.NAME_MANDATORY_FIELD )
  private String firstName;

  @Length( min = 2, message = ValidationConstants.NAME_NUMBER_OF_LETTERS_VALIDATION_ )
  @NotBlank( message = ValidationConstants.NAME_MANDATORY_FIELD )
  private String lastName;

  @Email
  @Length( max = 50, message = ValidationConstants.EMAIL_LENGTH )
  @NotBlank( message = ValidationConstants.EMAIL_REGEX )
  private String email;

  @JsonFormat( shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd" )
  private LocalDate dateOfBirth;
}
