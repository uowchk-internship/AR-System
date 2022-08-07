package com.example.arsystembackend.service.source;

import com.example.arsystembackend.dao.Argo29DAOService;
import com.example.arsystembackend.entity.source.Argo29;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class Argo29ServicesImpl implements Argo29Services{
    private Argo29DAOService argo29DAOService;

    @Autowired
    public Argo29ServicesImpl(Argo29DAOService argo29DAOService) {
        this.argo29DAOService = argo29DAOService;
    }

    @Override
    @Transactional
    public void saveData(List<Argo29> argo29List) {
        argo29DAOService.saveData(argo29List);
    }

    @Override
    @Transactional
    public List<Argo29> getAll() {
        return argo29DAOService.getAll();
    }

    @Override
    @Transactional
    public List<Argo29> getFirst10Rows() {
        return argo29DAOService.getFirst10Rows();
    }

    @Override
    @Transactional
    public List<Argo29> getSingleStudent(String sid) {
        return argo29DAOService.getSingleStudent(sid);
    }

    @Override
    @Transactional
    public long count() {
        return argo29DAOService.count();
    }

    @Override
    @Transactional
    public void removeAll() {
        argo29DAOService.removeAll();
    }

}
