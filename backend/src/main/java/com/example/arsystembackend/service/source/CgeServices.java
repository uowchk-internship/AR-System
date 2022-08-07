package com.example.arsystembackend.service.source;

import com.example.arsystembackend.entity.source.Argo11;
import com.example.arsystembackend.entity.source.Cge;

import java.util.List;

public interface CgeServices {
    public void saveData(List<Cge> cgeList);

    public List<Cge> getAll();

    public List<Cge> getFirst10Rows();

    public Cge getSingleCourse(String courseCode);

    public long count();

    public void removeAll();

}
