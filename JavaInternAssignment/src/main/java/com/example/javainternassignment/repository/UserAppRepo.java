package com.example.javainternassignment.repository;

import com.example.javainternassignment.model.UserApp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAppRepo extends JpaRepository<UserApp, Long> {

    UserApp findByEmail(String email);

}
