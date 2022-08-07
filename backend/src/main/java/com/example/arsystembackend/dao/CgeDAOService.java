package com.example.arsystembackend.dao;

import com.example.arsystembackend.entity.source.Argo11;
import com.example.arsystembackend.entity.source.Cge;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
public class CgeDAOService implements CgeDAO{
    private EntityManager entityManager;

    @Autowired
    public CgeDAOService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void saveData(List<Cge> cgeList) {
        Session currentSession = entityManager.unwrap(Session.class);
        for (Cge cge:cgeList){
            currentSession.saveOrUpdate(cge);
        }
    }

    @Override
    public List<Cge> getAll() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Cge", Cge.class);
        List<Cge> users = query.getResultList();
        return users;
    }

    @Override
    public List<Cge> getFirst10Rows(){
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Cge", Cge.class);
        query.setMaxResults(10);
        List<Cge> users = query.getResultList();
        return users;
    }
    @Override
    public Cge getSingleCourse(String courseCode) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Cge a WHERE a.code=:code", Cge.class);
        query.setParameter("code", courseCode);
        Cge cge = (Cge) query.getSingleResult();
        return cge;
    }

    @Override
    public long count() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Cge", Cge.class);
        List<Cge> cges = query.getResultList();
        return (long) cges.size();
    }

    @Override
    public void removeAll() {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.createQuery("DELETE FROM Cge")
                .executeUpdate();
    }

}
