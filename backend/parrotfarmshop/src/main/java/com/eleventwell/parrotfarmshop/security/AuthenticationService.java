package com.eleventwell.parrotfarmshop.security;


import com.eleventwell.parrotfarmshop.dto.UserDTO;
import com.eleventwell.parrotfarmshop.entity.RoleEntity;
import com.eleventwell.parrotfarmshop.entity.UserEntity;
import com.eleventwell.parrotfarmshop.repository.RoleRepository;
import com.eleventwell.parrotfarmshop.repository.UserRepository;
import com.eleventwell.parrotfarmshop.service.impl.JwtService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Autowired
    UserRepository repository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtService jwtService;

    @Autowired
    RoleRepository roleRepository;


    @Autowired
    AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {

        RoleEntity role = roleRepository.findOneById(request.getRoleId());
        var user = UserEntity.builder()
                .userName(request.getUserName())
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .status(request.getStatus())
                .imgUrl(request.getImgUrl())
                .gender(request.getGender())
                .build();
        repository.save(user);
        UserEntity userToReturn = repository.findOneByUserName(user.getUsername());

//        repository.findByEmail(user.getEmail()).get().

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userName(userToReturn.getUsername())
                .fullName(userToReturn.getFullName())
                .userId(userToReturn.getId())
                .status(userToReturn.getStatus())
                .email(userToReturn.getEmail())
                .imgUrl(request.getImgUrl())
                .roleId(role.getId())
                .gender(request.getGender())

                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        //check login
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()

                )

        );
        var user = repository.findByEmail(request.getEmail()).orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .userName(user.getUsername())
                .userId(user.getId())
                .fullName(user.getFullName())
                .status(user.getStatus())
                .email(user.getEmail())
                .roleId(user.getRole().getId())
                .imgUrl(user.getImgUrl())
                .gender(user.getGender())

                .build();
    }

    public AuthenticationResponse authenticateForUserLoginWithGoogle(AuthenticationRequest request) {
        //check login

        var user = repository.findByEmail(request.getEmail()).orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .userName(user.getUsername())
                .userId(user.getId())
                .fullName(user.getFullName())
                .status(user.getStatus())
                .email(user.getEmail())
                .roleId(user.getRole().getId())
                .imgUrl(user.getImgUrl())
                .build();
    }

    public  AuthenticationResponse changePassword(ChangePasswordRequest request) {
        var user = repository.findOneByUserName(request.getCurrentUsername());
        if(!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            return null;
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        repository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .userName(user.getUsername())
                .userId(user.getId())
                .fullName(user.getFullName())
                .status(user.getStatus())
                .email(user.getEmail())
                .roleId(user.getRole().getId())
                .imgUrl(user.getImgUrl())
                .build();
    }

    public  AuthenticationResponse updateProfile(UpdateProfileRequest request) {
        UserEntity user = repository.findOneByUserName(request.getUserName());

        user.setFullName(request.getFullName());
        user.setGender(request.getGender());
        user.setImgUrl(request.getImgUrl());
        user.setDob(request.getDob());

        repository.save(user);


        return AuthenticationResponse.builder()
                .token(request.getToken())
                .userId(user.getId())
                .userName(user.getUsername())
                .userId(user.getId())
                .fullName(user.getFullName())
                .status(user.getStatus())
                .email(user.getEmail())
                .roleId(user.getRole().getId())
                .imgUrl(user.getImgUrl())
                .dob(user.getDob())
                .gender(user.getGender())
                .build();
    }


}
