package com.example.arsystembackend.service.source;

import com.example.arsystembackend.dao.Argo29DAOService;
import com.example.arsystembackend.dao.CgeDAOService;
import com.example.arsystembackend.entity.source.Argo29;
import com.example.arsystembackend.entity.source.Cge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class CgeServicesImpl implements CgeServices {
    private CgeDAOService cgeDAOService;

    @Autowired
    public CgeServicesImpl(CgeDAOService cgeDAOService) {
        this.cgeDAOService = cgeDAOService;
    }

    @Override
    @Transactional
    public void saveData(List<Cge> cgeList) {
        cgeDAOService.saveData(cgeList);
    }

    @Override
    @Transactional
    public List<Cge> getAll() {
        return cgeDAOService.getAll();
    }

    @Override
    @Transactional
    public List<Cge> getFirst10Rows() {
        return cgeDAOService.getFirst10Rows();
    }

    @Override
    @Transactional
    public Cge getSingleCourse(String courseCode) {
        return cgeDAOService.getSingleCourse(courseCode);
    }

    @Override
    @Transactional
    public long count() {
        return cgeDAOService.count();
    }

    @Override
    @Transactional
    public void removeAll() {
        cgeDAOService.removeAll();
    }


}
