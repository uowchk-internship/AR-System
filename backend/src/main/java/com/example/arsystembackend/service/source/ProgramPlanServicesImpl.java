package com.example.arsystembackend.service.source;

import com.example.arsystembackend.dao.ProgramPlanDAOService;
import com.example.arsystembackend.entity.source.ProgramPlan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ProgramPlanServicesImpl implements ProgramPlanServices{

    private ProgramPlanDAOService programPlanDAOService;

    @Autowired
    public ProgramPlanServicesImpl(ProgramPlanDAOService programPlanDAOService) {
        this.programPlanDAOService = programPlanDAOService;
    }

    @Override
    @Transactional
    public void saveData(List<ProgramPlan> programPlanList) {
        programPlanDAOService.saveData(programPlanList);
    }

    @Override
    @Transactional
    public List<ProgramPlan> getAll() {
        return programPlanDAOService.getAll();
    }

    @Override
    @Transactional
    public List<ProgramPlan> getSingleProgramPlan(String programName) {
        return programPlanDAOService.getSingleProgramPlan(programName);
    }

    @Override
    @Transactional
    public List<ProgramPlan> getFirst10Rows(String year){
        return programPlanDAOService.getFirst10Rows(year);
    }

    @Override
    @Transactional
    public long count() {
        return programPlanDAOService.count();
    }


    @Override
    @Transactional
    public long countOfYear(String year){
        return programPlanDAOService.countOfYear(year);
    }

    @Override
    @Transactional
    public void removeAll() {
        programPlanDAOService.removeAll();
    }

    @Override
    @Transactional
    public void removeSingleYear(String year){
        programPlanDAOService.removeSingleYear(year);
    }
}
