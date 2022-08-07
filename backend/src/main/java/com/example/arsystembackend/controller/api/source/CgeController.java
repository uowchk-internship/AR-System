package com.example.arsystembackend.controller.api.source;

import com.example.arsystembackend.entity.source.Argo10;
import com.example.arsystembackend.entity.source.Argo29;
import com.example.arsystembackend.entity.source.Cge;
import com.example.arsystembackend.service.source.Argo29Services;
import com.example.arsystembackend.service.source.CgeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/source/cge")
public class CgeController {

    private CgeServices cgeServices;

    @Autowired
    public CgeController(CgeServices cgeServices) {
        this.cgeServices = cgeServices;
    }

    @PostMapping("/")
    public String saveNewCge(@RequestBody List<Cge> cgeList) {
        cgeServices.saveData(cgeList);
        return "done";
    }

    @GetMapping("/")
    public List<Cge> getAllCge() {
        return cgeServices.getAll();
    }

    @GetMapping("/first10Rows")
    public List<Cge> getFirst10Rows(){
        return cgeServices.getFirst10Rows();
    }


    @GetMapping("/count")
    public long getCgeCount() {
        return cgeServices.count();
    }


    @GetMapping("/removeAll")
    public String removeAllCge() {
        cgeServices.removeAll();
        return "done";
    }
}
