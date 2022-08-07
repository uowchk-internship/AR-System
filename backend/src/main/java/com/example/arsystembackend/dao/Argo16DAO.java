package com.example.arsystembackend.dao;

import com.example.arsystembackend.entity.source.Argo10;
import com.example.arsystembackend.entity.source.Argo16;

import java.util.List;

public interface Argo16DAO {
    public void saveData(List<Argo16> argo16List);

    public List<Argo16> getAll();

    public List<Argo16> getFirst10Rows();

    public List<Argo16> getSingleStudent(String sid);

    public long count();

    public void removeAll();

}
