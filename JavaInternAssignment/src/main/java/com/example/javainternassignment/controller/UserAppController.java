package com.example.javainternassignment.controller;

import com.example.javainternassignment.DTO.LoginDTO;
import com.example.javainternassignment.DTO.PasswordDTO;
import com.example.javainternassignment.model.UserApp;
import com.example.javainternassignment.repository.UserAppRepo;
import com.example.javainternassignment.service.UserAppService;
import com.example.javainternassignment.util.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserAppController {

    @Autowired
    private  UserAppService userAppService;

    private UserAppRepo userAppRepo;

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
            case "no user":
                return responseHandler.generateResponse(
                    HttpStatus.OK,
                    false,
                    "Invalid credentials",
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

    @PostMapping("/changePassword")
    public ResponseEntity<Object> changePassword(@RequestBody PasswordDTO passwordDTO){
           String change = userAppService.changePassword(passwordDTO);
           switch (change) {
               case "success":
                   return responseHandler.generateResponse(
                           HttpStatus.OK, true,
                           "Password Changed Successfully",
                           null);
               case "failed":
                   return responseHandler.generateResponse(HttpStatus.BAD_REQUEST, true, "Invalid email address", null);
               case "mismatch":
                   return responseHandler.generateResponse(HttpStatus.BAD_REQUEST, true, "Password does not match", null);

               default:
                   return responseHandler.generateResponse(HttpStatus.OK, true, "Something went wrong", null);


       }

    }
}
