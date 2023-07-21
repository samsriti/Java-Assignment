package com.example.javainternassignment.controller;

import com.example.javainternassignment.model.Medicine;
import com.example.javainternassignment.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/meds")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @PostMapping("/saveMed")
    public Medicine saveMedicine(@RequestBody Medicine medicine){
       return medicineService.saveMedicines(medicine);

    }

    @GetMapping("/getAllMeds")
    public List<Medicine> getAll(){
        return medicineService.medicines();
    }

    @GetMapping("/getByID/{id}")
    public Medicine getById(@PathVariable long id){
        return medicineService.medicineByID(id);
    }

    @PutMapping("/update")
    public Medicine updateMeds(@RequestBody Medicine medicine){
        return medicineService.updateMedicines(medicine);

    }

    @DeleteMapping("/delete/{id}")
    public String deleteMeds(@PathVariable long id){
        return  medicineService.deleteMedicine(id);
    }
}
