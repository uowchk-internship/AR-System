package com.example.arsystembackend.dao;

import com.example.arsystembackend.entity.report.course.CourseWithCrns;
import com.example.arsystembackend.entity.source.Argo12;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class Argo12DAOService implements Argo12DAO{
    private EntityManager entityManager;

    @Autowired
    public Argo12DAOService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void saveData(List<Argo12> argo12List) {
        Session currentSession = entityManager.unwrap(Session.class);
        for (Argo12 argo12 : argo12List) {
            currentSession.saveOrUpdate(argo12);
        }
    }

    @Override
    public List<Argo12> getAll() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Argo12", Argo12.class);
        List<Argo12> users = query.getResultList();
        return users;
    }


    @Override
    public List<CourseWithCrns> getAllCourses() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Argo12 a ", Argo12.class);
        List<Argo12> resultList = query.getResultList();
        Map<String, CourseWithCrns> coursesMap = new HashMap<>();

        for (Argo12 argo12:resultList){
            CourseWithCrns courseMapResult = coursesMap.get(argo12.getCourseCode());
            String keyString = argo12.getSubjType()+" ("+argo12.getCrn()+")";
            if (courseMapResult == null){
                CourseWithCrns courseWithCrns = new CourseWithCrns();
                courseWithCrns.setCourseCode(argo12.getCourseCode());
                courseWithCrns.setCourseTitle(argo12.getCourseTitle());
                courseWithCrns.setCourseOfferDept(argo12.getCourseOfferDept());
                List<String> crnList = new ArrayList<>();
                crnList.add(keyString);
                courseWithCrns.setSectionCrnList(crnList);

                coursesMap.put(argo12.getCourseCode(),courseWithCrns);
            }else{
                List<String> sectionCrnList = courseMapResult.getSectionCrnList();
                if (!sectionCrnList.contains(keyString)){
                    sectionCrnList.add(keyString);
                    courseMapResult.setSectionCrnList(sectionCrnList);
                    coursesMap.put(argo12.getCourseCode(), courseMapResult);
                }
            }
        }

        List<CourseWithCrns> result = new ArrayList<>();
        for(String key : coursesMap.keySet()){
            CourseWithCrns courseWithCrns = coursesMap.get(key);
            result.add(courseWithCrns);
        }

        return result;
    }

    @Override
    public List<Argo12> getFirst10Rows() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Argo12", Argo12.class);
        query.setMaxResults(10);
        List<Argo12> users = query.getResultList();
        return users;
    }

    @Override
    public long count() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("SELECT count(a.id) FROM Argo12 a", Long.class);
        return (long) query.getSingleResult();
    }

    @Override
    public void removeAll() {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.createQuery("DELETE FROM Argo12")
                .executeUpdate();
    }

}
