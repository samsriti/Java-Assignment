package com.example.javainternassignment.service;

import com.example.javainternassignment.DTO.LoginDTO;
import com.example.javainternassignment.model.UserApp;
import com.example.javainternassignment.repository.UserAppRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserAppService {

    @Autowired
    public UserAppRepo userAppRepo;

    @Autowired
    private  PasswordEncoder passwordEncoder;

    //Method for saving new users to database
    public String saveUser(UserApp userApp){
        UserApp userApp1 = userAppRepo.findByEmail(userApp.getEmail());
        if (userApp1==null){
            userApp.setFirstName(userApp.getFirstName());
            userApp.setLastName(userApp.getLastName());
            userApp.setEmail(userApp.getEmail());
            userApp.setPassword(passwordEncoder.encode(userApp.getPassword()));
            userApp = userAppRepo.save(userApp);
            if(userApp!=null){
                return "success";
            }else{
                return "failed";
            }
        }else{
            return "duplicate";
        }
    }


    //Method for login
    public String loginUser(LoginDTO loginDTO){
    UserApp userApp1 = userAppRepo.findByEmail(loginDTO.getEmail()); // -1 --> s1@gmail.com
       if (userApp1 == null){
           return "no user";
       }
       BCryptPasswordEncoder bCryptPasswordEncoder1 = new BCryptPasswordEncoder();
       if(bCryptPasswordEncoder1.matches(loginDTO.getPassword(), userApp1.getPassword())){
            return "success";
       }else{
           return "failed";
       }
    }

}
