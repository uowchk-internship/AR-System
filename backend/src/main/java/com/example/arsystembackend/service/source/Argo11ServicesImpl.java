package com.example.arsystembackend.service.source;

import com.example.arsystembackend.dao.Argo11DAOService;
import com.example.arsystembackend.entity.source.Argo11;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class Argo11ServicesImpl implements Argo11Services{
    private Argo11DAOService argo11DAOService;

    @Autowired
    public Argo11ServicesImpl(Argo11DAOService argo11DAOService) {
        this.argo11DAOService = argo11DAOService;
    }

    @Override
    @Transactional
    public void saveData(List<Argo11> argo11List) {
        argo11DAOService.saveData(argo11List);
    }

    @Override
    @Transactional
    public List<Argo11> getAll() {
        return argo11DAOService.getAll();
    }

    @Override
    @Transactional
    public List<Argo11> getByIdList(List<String> idList){
        return argo11DAOService.getByIdList(idList);
    }
    @Override
    @Transactional
    public List<String> getAllPrograms(){
        return argo11DAOService.getAllPrograms();
    }

    @Override
    @Transactional
    public List<String> getProgramsByDepartment(String department){
        return argo11DAOService.getProgramsByDepartment(department);
    }

    @Override
    @Transactional
    public List<Argo11> getFirst10Rows(){
        return argo11DAOService.getFirst10Rows();
    }
    @Override
    @Transactional
    public Argo11 getSingleStudent(String sid) {
        return argo11DAOService.getSingleStudent(sid);
    }

    @Override
    @Transactional
    public long count() {
        return argo11DAOService.count();
    }

    @Override
    @Transactional
    public void removeAll() {
        argo11DAOService.removeAll();
    }

}
