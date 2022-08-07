package com.example.arsystembackend.dao;

import com.example.arsystembackend.entity.report.course.CourseWithCrns;
import com.example.arsystembackend.entity.source.Argo12;

import java.util.List;

public interface Argo12DAO {
    public void saveData(List<Argo12> argo12List);

    public List<Argo12> getAll();

    List<CourseWithCrns> getAllCourses();
    public List<Argo12> getFirst10Rows();

    public long count();

    public void removeAll();
}
