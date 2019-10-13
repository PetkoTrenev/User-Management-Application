package com.example.usermanagement.rest;

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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin
@RequiredArgsConstructor
public class UserResource
{
    private final UserMapper userMapper;
    private final UserService userService;

    /**
     * REST endpoint for getting user information {@link UserResponseDTO}
     *
     * @param pageable {@link Pageable} contains page number, size and {@link Sort}
     * @return {@link UserResponseDTO} {@link HttpStatus#OK} if the request is processed successfully
     */
    @ApiOperation(value = "Retrieve collection of users",
            notes = "When given page number size and sort, this method returns all Users sorted with role different from ADMIN.")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageNumber", dataType = "int", paramType = "query", example = "0",
                    value = "Results page you want to retrieve (0..N)"),
            @ApiImplicitParam(name = "pageSize", dataType = "int", paramType = "query", example = "10",
                    value = "Number of records per page."),
            @ApiImplicitParam(name = "sort", allowMultiple = true, dataType = "string",
                    paramType = "query", value = "Sorting criteria in the format: property(,asc/desc). "
                    + "Default sort order is ascending. " + "Multiple sort criteria are supported.")
    })
    @GetMapping
    public ResponseEntity<UserResponseDTO> getUsers(Pageable pageable)
    {
        log.info("Request for users for page {} and size {} received.",
                pageable.getPageNumber(), pageable.getPageSize());

        Page<User> pageOfUsers = userService.findAll(pageable);

        List<UserInfoDTO> userInfoDTOs = pageOfUsers.get()
                .map(user -> userMapper.userToUserInfoDTO(user))
                .collect(toList());

        UserResponseDTO userResponseDto = UserResponseDTO.builder()
                .users(userInfoDTOs)
                .totalPages(pageOfUsers.getTotalPages())
                .totalElements(pageOfUsers.getTotalElements())
                .build();

        return ResponseEntity.ok(userResponseDto);
    }

    /**
     * Persist {@link User}
     */
    @ApiOperation(value = "Create user")
    @PostMapping
    public ResponseEntity<User> create(@Valid @RequestBody UserInfoDTO userInfoDTO)
    {
        User user = userMapper.userInfoDTOtoUser(userInfoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user));
    }

    @ApiOperation(value = "Update user")
    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @Valid @RequestBody UserInfoDTO userInfoDTO)
    {
        if (!userService.findById(id).isPresent()) {
            log.error("User with " + id + " doesn't exist");
            return ResponseEntity.badRequest().build();
        }

        userService.save(userMapper.userInfoDTOtoUser(userInfoDTO));
        return ResponseEntity.ok().build();
    }

    @ApiOperation("Delete user")
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id)
    {
        if (!userService.findById(id).isPresent()) {
            log.error("User with " + id + " doesn't exist");
            return ResponseEntity.badRequest().build();
        }

        userService.deleteById(id);

        return ResponseEntity.ok().build();
    }
}
