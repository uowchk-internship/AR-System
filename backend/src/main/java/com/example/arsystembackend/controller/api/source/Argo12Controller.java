package com.example.arsystembackend.controller.api.source;

import com.example.arsystembackend.entity.report.course.CourseWithCrns;
import com.example.arsystembackend.entity.source.Argo12;
import com.example.arsystembackend.service.source.Argo12Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/source/argo12")
public class Argo12Controller {

    private Argo12Services argo12Services;

    @Autowired
    public Argo12Controller(Argo12Services argo12Services) {
        this.argo12Services = argo12Services;
    }

    @PostMapping("/")
    public String saveNewArgo12(@RequestBody List<Argo12> argo12List) {
        argo12Services.saveData(argo12List);
        return "done";
    }

    @GetMapping("/")
    public List<Argo12> getAllArgo12() {
        return argo12Services.getAll();
    }

    @GetMapping("/first10Rows")
    public List<Argo12> getFirst10Rows() {
        return argo12Services.getFirst10Rows();
    }

    @GetMapping("/courses")
    public List<CourseWithCrns> getProgramsByDepartment() {
        return argo12Services.getAllCourses();
    }

    @GetMapping("/count")
    public long getArgo12Count() {
        return argo12Services.count();
    }

    @GetMapping("/removeAll")
    public String removeAllArgo12() {
        argo12Services.removeAll();
        return "done";
    }
}
