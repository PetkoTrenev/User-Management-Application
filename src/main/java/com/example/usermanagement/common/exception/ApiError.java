package com.example.usermanagement.common.exception;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiError {

  private LocalDateTime timestamp;
  private HttpStatus    status;
  private List<String>  errors;

}
