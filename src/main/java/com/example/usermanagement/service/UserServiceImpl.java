package com.example.usermanagement.service;

import com.example.usermanagement.model.User;
import com.example.usermanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService
{
    private final UserRepository userRepository;

    @Override
    public Optional<User> findById(Long id)
    {
        return userRepository.findById(id);
    }

    @Override
    public User save(User user)
    {
        return userRepository.save(user);
    }

    @Override
    public Page<User> findAll(Pageable pageable)
    {
        return userRepository.findAll(pageable);
    }

    @Override
    public void deleteById(Long id)
    {
        userRepository.deleteById(id);
    }
}
