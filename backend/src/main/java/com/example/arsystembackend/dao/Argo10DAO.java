package com.example.arsystembackend.dao;

import com.example.arsystembackend.entity.source.Argo10;
import com.example.arsystembackend.entity.source.Argo11;

import java.util.List;

public interface Argo10DAO {

    public void saveData(List<Argo10> argo10List);

    public List<Argo10> getAll();

    public List<Argo10> getFirst10Rows();

    public List<Argo10> getSingleStudent(String sid);

    public long count();
    public List<String> getAllEnrolledTerms();

    public void removeAll();
}
