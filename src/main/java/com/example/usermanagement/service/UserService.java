package com.example.usermanagement.service;

import com.example.usermanagement.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface UserService
{
    /**
     * Find a {@link User} by its id
     *
     * @param id id of the Skill
     * @return
     */
    Optional<User> findById(Long id);

    /**
     * Saves a {@link User}
     *
     * @param user to save/update
     * @return the persisted/updated {@link User}
     */
    User save(User user);

    /**
     * Find Users based on a {@link Pageable#getPageNumber()}, {@link Pageable#getPageSize()} and
     * {@link Pageable#getSort()},
     *
     * @param pageable {@link Pageable}
     * @return {@link Page} of {@link User}
     */
    Page<User> findAll(Pageable pageable);

    /**
     * Delete {@link User} using id
     * @param id of {@link User}
     */
    void deleteById(Long id);
}
