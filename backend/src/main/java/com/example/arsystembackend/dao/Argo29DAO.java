package com.example.arsystembackend.dao;

import com.example.arsystembackend.entity.source.Argo10;
import com.example.arsystembackend.entity.source.Argo29;

import java.util.List;

public interface Argo29DAO {

    public void saveData(List<Argo29> argo29List);

    public List<Argo29> getAll();

    public List<Argo29> getFirst10Rows();

    public List<Argo29> getSingleStudent(String sid);

    public long count();

    public void removeAll();

}
