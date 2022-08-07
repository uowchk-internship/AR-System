package com.example.arsystembackend.service.source;

import com.example.arsystembackend.dao.Argo16DAOService;
import com.example.arsystembackend.entity.source.Argo16;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class Argo16ServicesImpl implements Argo16Services{
    private Argo16DAOService argo16DAOService;

    @Autowired
    public Argo16ServicesImpl(Argo16DAOService argo16DAOService) {
        this.argo16DAOService = argo16DAOService;
    }

    @Override
    @Transactional
    public void saveData(List<Argo16> argo16List) {
        argo16DAOService.saveData(argo16List);
    }

    @Override
    @Transactional
    public List<Argo16> getAll() {
        return argo16DAOService.getAll();
    }

    @Override
    @Transactional
    public List<Argo16> getFirst10Rows() {
        return argo16DAOService.getFirst10Rows();
    }

    @Override
    @Transactional
    public List<Argo16> getSingleStudent(String sid) {
        return argo16DAOService.getSingleStudent(sid);
    }

    @Override
    @Transactional
    public long count() {
        return argo16DAOService.count();
    }

    @Override
    @Transactional
    public void removeAll() {
        argo16DAOService.removeAll();
    }

}
