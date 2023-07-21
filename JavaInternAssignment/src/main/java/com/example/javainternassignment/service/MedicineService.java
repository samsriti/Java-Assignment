package com.example.javainternassignment.service;

import com.example.javainternassignment.model.Medicine;
import com.example.javainternassignment.repository.MedicineRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {
    @Autowired
    private MedicineRepo medicineRepo;

    public Medicine saveMedicines(Medicine medicine){
        return medicineRepo.save(medicine);
    }

    public List<Medicine> medicines(){
        return  medicineRepo.findAll();
    }

    public Medicine medicineByID(long id){
        return medicineRepo.findById(id).orElse(null);
    }

    public Medicine updateMedicines(Medicine medicine){
        Medicine medicine1 = medicineRepo.findById(medicine.getId()).orElse(null);
        medicine.setName(medicine.getName());
        medicine.setDescription(medicine.getDescription());
        medicine.setQuantity(medicine.getQuantity());
        medicine.setExpiryDate(medicine.getExpiryDate());
        medicine.setPrice(medicine.getPrice());
        return medicineRepo.save(medicine);

    }

    public String deleteMedicine(long id){
        medicineRepo.deleteById(id);
        return "success";

    }


}
