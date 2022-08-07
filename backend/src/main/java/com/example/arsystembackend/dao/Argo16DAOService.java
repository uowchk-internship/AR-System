package com.example.arsystembackend.dao;

import com.example.arsystembackend.entity.source.Argo10;
import com.example.arsystembackend.entity.source.Argo16;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
public class Argo16DAOService implements Argo16DAO{
    private EntityManager entityManager;

    @Autowired
    public Argo16DAOService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @Override
    public void saveData(List<Argo16> argo16List) {
        Session currentSession = entityManager.unwrap(Session.class);
        for (Argo16 argo16:argo16List){
            currentSession.saveOrUpdate(argo16);
        }
    }

    @Override
    public List<Argo16> getAll() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Argo16", Argo16.class);
        List<Argo16> users = query.getResultList();
        return users;
    }

    @Override
    public List<Argo16> getFirst10Rows(){
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Argo16", Argo16.class);
        query.setMaxResults(10);
        List<Argo16> users = query.getResultList();
        return users;
    }
    @Override
    public List<Argo16> getSingleStudent(String sid) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Argo16 a WHERE a.studId=:sid", Argo16.class);
        query.setParameter("sid", sid);
        List<Argo16> argo16 = query.getResultList();
        return argo16;
    }


    @Override
    public long count() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("SELECT count(a.id) FROM Argo16 a", Long.class);
        return (long) query.getSingleResult();
    }

    @Override
    public void removeAll() {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.createQuery("DELETE FROM Argo16")
                .executeUpdate();
    }


}
