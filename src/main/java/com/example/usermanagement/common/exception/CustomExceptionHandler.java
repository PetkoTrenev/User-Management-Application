package com.example.usermanagement.common.exception;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.toList;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler( UserNotFoundException.class )
  public ResponseEntity<ApiError> handleUserNotFoundException( Exception ex ) {
    ApiError error = ApiError.builder()
        .timestamp( LocalDateTime.now() )
        .errors( Arrays.asList( ex.getMessage() ) )
        .status( HttpStatus.NOT_FOUND ).build();
    return new ResponseEntity<>( error, HttpStatus.NOT_FOUND );
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(
      MethodArgumentNotValidException ex,
      HttpHeaders headers,
      HttpStatus status,
      WebRequest request ) {
    Map<String, Object> body = new LinkedHashMap<>();
    body.put( "timestamp", LocalDateTime.now() );
    body.put( "status", status.value() );

    Map<String, List<String>> erorrs = ex.getBindingResult()
        .getFieldErrors()
        .stream().collect( groupingBy(
            FieldError::getField, mapping( FieldError::getDefaultMessage, toList() ) ) );

    body.put( "errors", erorrs );

    return new ResponseEntity<>( body, headers, status );
  }
}
