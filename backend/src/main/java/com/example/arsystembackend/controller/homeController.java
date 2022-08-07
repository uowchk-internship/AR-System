package com.example.arsystembackend.controller;

import com.example.arsystembackend.service.source.Argo10Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class homeController {

    private Argo10Services argo10Services;

    @Autowired
    public homeController(Argo10Services argo10Services) {
        this.argo10Services = argo10Services;
    }

    @GetMapping("/")
    public String HomeControllerAPI() {
        argo10Services.count();
        return "Hello world";
    }
}
