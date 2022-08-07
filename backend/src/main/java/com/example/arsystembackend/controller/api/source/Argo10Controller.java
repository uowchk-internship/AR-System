package com.example.arsystembackend.controller.api.source;

import com.example.arsystembackend.entity.source.Argo10;
import com.example.arsystembackend.service.source.Argo10Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/source/argo10")
public class Argo10Controller {

    private Argo10Services argo10Services;

    @Autowired
    public Argo10Controller(Argo10Services argo10Services) {
        this.argo10Services = argo10Services;
    }

    @PostMapping("/")
    public String saveNewArgo10(@RequestBody List<Argo10> argo10List) {
        argo10Services.saveData(argo10List);
        return "done";
    }

    @GetMapping("/")
    public List<Argo10> getAllArgo10() {
        return argo10Services.getAll();
    }

    @GetMapping("/first10Rows")
    public List<Argo10> getFirst10Rows(){
        return argo10Services.getFirst10Rows();
    }

    @GetMapping("/count")
    public long getArgo10Count() {
        return argo10Services.count();
    }

    @GetMapping("/enrolTerms")
    public List<String> getEnrolTerms() {
        List<String> terms = argo10Services.getAllEnrolledTerms();
        terms = terms.stream()
                .filter(term -> term.substring(4).equals("09"))
                .collect(Collectors.toList());
        return terms;
    }

    @GetMapping("/removeAll")
    public String removeAllArgo10() {
        argo10Services.removeAll();
        return "done";
    }
}
