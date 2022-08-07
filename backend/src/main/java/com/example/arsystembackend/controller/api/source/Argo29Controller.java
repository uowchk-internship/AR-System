package com.example.arsystembackend.controller.api.source;

import com.example.arsystembackend.entity.source.Argo10;
import com.example.arsystembackend.entity.source.Argo29;
import com.example.arsystembackend.service.source.Argo29Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/source/argo29")
public class Argo29Controller {

    private Argo29Services argo29Services;

    @Autowired
    public Argo29Controller(Argo29Services argo29Services) {
        this.argo29Services = argo29Services;
    }

    @PostMapping("/")
    public String saveNewArgo29(@RequestBody List<Argo29> argo29List) {
        argo29Services.saveData(argo29List);
        return "done";
    }

    @GetMapping("/")
    public List<Argo29> getAllArgo29() {
        return argo29Services.getAll();
    }

    @GetMapping("/first10Rows")
    public List<Argo29> getFirst10Rows(){
        return argo29Services.getFirst10Rows();
    }

    @GetMapping("/count")
    public long getArgo29Count() {
        return argo29Services.count();
    }


    @GetMapping("/removeAll")
    public String removeAllArgo29() {
        argo29Services.removeAll();
        return "done";
    }
}
