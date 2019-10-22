package com.example.usermanagement.common.exception;

public class UserNotFoundException extends RuntimeException {
  public UserNotFoundException( Long id ) {
    super( constructMessage( id ) );
  }

  private static String constructMessage( Long id ) {
    StringBuilder sb = new StringBuilder();
    sb.append( "User with id: " );
    sb.append( id ).append( " " );
    sb.append( "was not found." );

    return sb.toString();
  }
}
