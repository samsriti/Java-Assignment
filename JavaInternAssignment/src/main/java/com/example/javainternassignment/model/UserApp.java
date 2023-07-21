package com.example.javainternassignment.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data @Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="user")
public class UserApp {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private  long id;
    private String firstName;

    private String lastName;
    private String email;
    private String password;
    private String changePasswordToken;

}
