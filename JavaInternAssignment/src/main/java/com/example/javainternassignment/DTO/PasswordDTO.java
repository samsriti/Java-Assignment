package com.example.javainternassignment.DTO;

import lombok.Data;

@Data
public class PasswordDTO {
    private String email;
    private String password;
    private String confirmPassword;
}
