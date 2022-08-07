package com.example.arsystembackend.dao;

import com.example.arsystembackend.entity.source.Argo10;
import com.example.arsystembackend.entity.source.Argo29;
import com.example.arsystembackend.entity.source.Cge;

import java.util.List;

public interface CgeDAO {

    public void saveData(List<Cge> cgeList);

    public List<Cge> getAll();

    public List<Cge> getFirst10Rows();

    public Cge getSingleCourse(String courseCode);

    public long count();

    public void removeAll();

}
