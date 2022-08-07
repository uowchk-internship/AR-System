package com.example.arsystembackend.controller.api.source;

import com.example.arsystembackend.entity.source.Argo10;
import com.example.arsystembackend.entity.source.Argo11;
import com.example.arsystembackend.service.source.Argo11Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/source/argo11")
public class Argo11Controller {

    private Argo11Services argo11Services;

    @Autowired
    public Argo11Controller(Argo11Services argo11Services) {
        this.argo11Services = argo11Services;
    }

    @PostMapping("/")
    public String saveNewArgo11(@RequestBody List<Argo11> argo11List) {
        argo11Services.saveData(argo11List);
        return "done";
    }

    @GetMapping("/")
    public List<Argo11> getAllArgo11() {
        return argo11Services.getAll();
    }

    @GetMapping("/first10Rows")
    public List<Argo11> getFirst10Rows() {
        return argo11Services.getFirst10Rows();
    }

    @GetMapping("/programs/{department}")
    public List<String> getProgramsByDepartment(@PathVariable String department) {
        System.out.println("department: " + department);
        if (department.equals("ALL")) {
            return argo11Services.getAllPrograms();
        } else {
            return argo11Services.getProgramsByDepartment(department);
        }
    }

    @GetMapping("/count")
    public long getArgo11Count() {
        return argo11Services.count();
    }

    @GetMapping("/removeAll")
    public String removeAllArgo11() {
        argo11Services.removeAll();
        return "done";
    }
}
