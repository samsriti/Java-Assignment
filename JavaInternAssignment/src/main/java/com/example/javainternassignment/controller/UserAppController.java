package com.example.javainternassignment.controller;

import com.example.javainternassignment.DTO.LoginDTO;
import com.example.javainternassignment.model.UserApp;
import com.example.javainternassignment.service.UserAppService;
import com.example.javainternassignment.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserAppController {

    @Autowired
    private  UserAppService userAppService;

    @Autowired
    private ResponseHandler responseHandler;

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody UserApp userApp){
        String saveUser = userAppService.saveUser(userApp);
        switch (saveUser){
            case "success":
                return responseHandler.generateResponse(
                        HttpStatus.OK,
                        true,
                        "New user Registered",
                        null
                        );
            case "failed":
                return responseHandler.generateResponse(
                        HttpStatus.BAD_REQUEST,
                        false,
                        "Failed to register",
                        null
                );
            case "duplicate":
                return responseHandler.generateResponse(
                        HttpStatus.OK,
                        false,
                        "Email ID already exists",
                        null
                );
            default:
                return responseHandler.generateResponse(HttpStatus.OK,
                    false,
                    "Something went wrong",
                    null);

        }

    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginDTO loginDTO){
        String login = userAppService.loginUser(loginDTO);
        switch (login){
            case "success":
                return responseHandler.generateResponse(
                    HttpStatus.OK,
                    true,
                    "Logged in successfully",
                    null

            );
            case "failed":
                return responseHandler.generateResponse(
                    HttpStatus.OK,
                    false,
                    "Login failed",
                    null
            );
            default:
                return responseHandler.generateResponse(HttpStatus.OK,
                        false,
                        "Something went wrong",
                        null);
        }

    }

    @GetMapping("/logout")
    public UserApp logout(){
        return null;
    }
}
