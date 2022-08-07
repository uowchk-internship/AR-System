package com.example.arsystembackend.controller.api.source;

import com.example.arsystembackend.entity.source.Argo10;
import com.example.arsystembackend.entity.source.ProgramPlan;
import com.example.arsystembackend.service.source.ProgramPlanServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/source/programPlan")
public class ProgramPlanController {

    private ProgramPlanServices programPlanServices;

    @Autowired
    public ProgramPlanController(ProgramPlanServices programPlanServices) {
        this.programPlanServices = programPlanServices;
    }

    @PostMapping("/")
    public String saveNewProgramPlan(@RequestBody List<ProgramPlan> programPlanList) {
        programPlanServices.saveData(programPlanList);
        return "done";
    }

    @GetMapping("/")
    public List<ProgramPlan> getAllProgramPlan() {
        return programPlanServices.getAll();
    }

    @GetMapping("/first10Rows/{year}")
    public List<ProgramPlan> getFirst10Rows(@PathVariable String year){
        return programPlanServices.getFirst10Rows(year);
    }


    @GetMapping("/count")
    public long getProgramPlanCount() {
        return programPlanServices.count();
    }

    @GetMapping("/countByYear/{year}")
    public long getProgramPlanCountByYear(@PathVariable String year) {
        return programPlanServices.countOfYear(year);
    }


    @GetMapping("/removeAll")
    public String removeAllProgramPlan() {
        programPlanServices.removeAll();
        return "done";
    }

    @GetMapping("/remove/{year}")
    public String removeProgramPlanOfYear(@PathVariable String year) {
        programPlanServices.removeSingleYear(year);
        return "done";
    }

}

