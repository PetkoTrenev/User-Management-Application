package com.example.usermanagement.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.usermanagement.model.User;

public interface UserService {
  /**
   * Find a {@link User} by its id
   *
   * @param id id of the user
   * @return
   */
  Optional<User> findById( Long id );

  /**
   * Saves a {@link User}
   *
   * @param user to save/update
   * @return the persisted/updated {@link User}
   */
  User save( User user );

  /**
   * Find Users based on a {@link Pageable#getPageNumber()}, {@link Pageable#getPageSize()} and
   * {@link Pageable#getSort()},
   *
   * @param pageable {@link Pageable}
   * @return {@link Page} of {@link User}
   */
  Page<User> findAll( Pageable pageable );

  /**
   * Delete {@link User} using id
   *
   * @param id of {@link User}
   */
  void deleteById( Long id );
}
