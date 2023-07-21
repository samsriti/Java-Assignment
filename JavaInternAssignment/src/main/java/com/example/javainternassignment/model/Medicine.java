package com.example.javainternassignment.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Data
@Getter @Setter
public class Medicine {

    @Id
    @GeneratedValue
    private long id;
    private String medName;
    private String description;
    private double price;
    private int quantity;
    private Date expiryDate;

}
