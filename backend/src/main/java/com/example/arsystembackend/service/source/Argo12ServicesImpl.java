package com.example.arsystembackend.service.source;

import com.example.arsystembackend.dao.Argo12DAOService;
import com.example.arsystembackend.entity.report.course.CourseWithCrns;
import com.example.arsystembackend.entity.source.Argo12;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class Argo12ServicesImpl implements Argo12Services{
    private Argo12DAOService argo12DAOService;

    @Autowired
    public Argo12ServicesImpl(Argo12DAOService argo12DAOService) {
        this.argo12DAOService = argo12DAOService;
    }

    @Override
    @Transactional
    public void saveData(List<Argo12> argo12List) {
        argo12DAOService.saveData(argo12List);
    }

    @Override
    @Transactional
    public List<Argo12> getAll() {
        return argo12DAOService.getAll();
    }

    @Override
    @Transactional
    public List<CourseWithCrns> getAllCourses(){
        return argo12DAOService.getAllCourses();
    }


    @Override
    @Transactional
    public List<Argo12> getFirst10Rows(){
        return argo12DAOService.getFirst10Rows();
    }

    @Override
    @Transactional
    public long count() {
        return argo12DAOService.count();
    }

    @Override
    @Transactional
    public void removeAll() {
        argo12DAOService.removeAll();
    }

}
