package com.example.arsystembackend.service.source;

import com.example.arsystembackend.entity.source.Cge;
import com.example.arsystembackend.entity.source.ProgramPlan;

import java.util.List;

public interface ProgramPlanServices {

    public void saveData(List<ProgramPlan> programPlanList);

    public List<ProgramPlan> getAll();

    public List<ProgramPlan> getFirst10Rows(String year);

    public List<ProgramPlan> getSingleProgramPlan(String programName);

    public long count();

    public long countOfYear(String year);
    public void removeAll();

    public void removeSingleYear(String year);

}
