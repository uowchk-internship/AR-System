package com.example.arsystembackend.dao;

import com.example.arsystembackend.entity.source.Argo10;
import com.example.arsystembackend.entity.source.Argo11;

import java.util.List;

public interface Argo11DAO {
    public void saveData(List<Argo11> argo11List);

    public List<Argo11> getAll();

    public List<Argo11> getByIdList(List<String> idList);

    public List<String> getAllPrograms();

    public List<String> getProgramsByDepartment(String department);

    public List<Argo11> getFirst10Rows();

    public Argo11 getSingleStudent(String sid);

    public long count();

    public void removeAll();

}
