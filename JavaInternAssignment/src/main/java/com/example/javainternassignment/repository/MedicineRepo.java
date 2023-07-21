package com.example.javainternassignment.repository;

import com.example.javainternassignment.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepo extends JpaRepository<Medicine,Long > {
}
