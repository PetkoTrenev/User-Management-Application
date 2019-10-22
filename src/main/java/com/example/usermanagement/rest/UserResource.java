package com.example.usermanagement.rest;

import static java.util.stream.Collectors.toList;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.usermanagement.common.exception.UserNotFoundException;
import com.example.usermanagement.mapper.UserMapper;
import com.example.usermanagement.model.User;
import com.example.usermanagement.rest.dto.UserInfoDTO;
import com.example.usermanagement.rest.dto.UserResponseDTO;
import com.example.usermanagement.service.UserService;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Slf4j
@EnableSwagger2
@RestController
@RequestMapping( "/api/v1/users" )
@CrossOrigin
@RequiredArgsConstructor
public class UserResource {
  private static final String USER_NOT_FOUND = "User with {0} not found";

  private final UserMapper  userMapper;
  private final UserService userService;

  /**
   * REST endpoint for getting user information {@link UserResponseDTO}
   *
   * @param pageable {@link Pageable} contains page number, size and {@link Sort}
   * @return {@link UserResponseDTO} {@link HttpStatus#OK} if the request is processed successfully
   */
  @ApiOperation( value = "Retrieve collection of users" )
  @ApiImplicitParams( {
      @ApiImplicitParam( name = "pageNumber", dataType = "int", paramType = "query", example = "0",
          value = "Results page you want to retrieve (0..N)" ),
      @ApiImplicitParam( name = "pageSize", dataType = "int", paramType = "query", example = "10",
          value = "Number of records per page." ),
      @ApiImplicitParam( name = "sort", allowMultiple = true, dataType = "string",
          paramType = "query", value = "Sorting criteria in the format: property(,asc/desc). "
          + "Default sort order is ascending. " + "Multiple sort criteria are supported." )
  } )
  @GetMapping
  public ResponseEntity<UserResponseDTO> getUsers( Pageable pageable ) {
    log.info( "Request for users for page {} and size {} received.",
        pageable.getPageNumber(), pageable.getPageSize() );

    Page<User> pageOfUsers = userService.findAll( pageable );

    List<UserInfoDTO> userInfoDTOs = pageOfUsers.get()
        .map( userMapper::userToUserInfoDTO )
        .collect( toList() );

    UserResponseDTO userResponseDto = UserResponseDTO.builder()
        .users( userInfoDTOs )
        .totalPages( pageOfUsers.getTotalPages() )
        .totalElements( pageOfUsers.getTotalElements() )
        .build();

    return ResponseEntity.ok( userResponseDto );
  }

  @ApiOperation( value = "Get a user" )
  @GetMapping( "/{id}" )
  public ResponseEntity<UserInfoDTO> get( @NotNull @PathVariable Long id ) {
    log.info( "Request for displaying user details for user with id: {} ", id );
    Optional<User> optionalUser = userService.findById( id );
    if( !optionalUser.isPresent() ) {
      log.error( USER_NOT_FOUND, id );
      throw new UserNotFoundException( id );
    }
    UserInfoDTO userInfoDTO = userMapper.userToUserInfoDTO( optionalUser.get() );
    return ResponseEntity.ok( userInfoDTO );
  }

  /**
   * Persist {@link User}
   */
  @ApiOperation( value = "Persist user" )
  @PostMapping
  public ResponseEntity<UserInfoDTO> create( @Valid @RequestBody UserInfoDTO userInfoDTO ) {
    log.info( "Request for creating user with email: {} ", userInfoDTO.getEmail() );
    User user = userService.save( userMapper.userInfoDTOtoUser( userInfoDTO ) );
    return ResponseEntity.status( HttpStatus.CREATED ).body( userMapper.userToUserInfoDTO( user ) );
  }

  @ApiOperation( value = "Update/persist user" )
  @PutMapping( "/{id}" )
  public ResponseEntity update( @PathVariable @NotNull Long id, @Valid @RequestBody UserInfoDTO userInfoDTO ) {
    log.info( "Request for updating user with id: {}", userInfoDTO.getId() );
    Optional<User> userOptional = userService.findById( id );
    if( !userOptional.isPresent() ) {
      log.error( USER_NOT_FOUND, id );
    }

    userService.save( userMapper.userInfoDTOtoUser( userInfoDTO ) );

    return ResponseEntity.ok().build();
  }

  @ApiOperation( "Delete user" )
  @DeleteMapping( "/{id}" )
  public ResponseEntity delete( @PathVariable @NotNull Long id ) {
    log.info( "Request for deleting user with id: {}", id );
    userService.deleteById( id );

    return ResponseEntity.noContent().build();
  }
}
