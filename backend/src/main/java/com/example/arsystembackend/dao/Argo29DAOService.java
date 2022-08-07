package com.example.arsystembackend.dao;

import com.example.arsystembackend.entity.source.Argo10;
import com.example.arsystembackend.entity.source.Argo29;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
public class Argo29DAOService implements Argo29DAO{

    private EntityManager entityManager;

    @Autowired
    public Argo29DAOService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @Override
    public void saveData(List<Argo29> argo29List) {
        Session currentSession = entityManager.unwrap(Session.class);
        for (Argo29 argo29:argo29List){
            currentSession.saveOrUpdate(argo29);
        }
    }

    @Override
    public List<Argo29> getAll() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Argo29", Argo29.class);
        List<Argo29> users = query.getResultList();
        return users;
    }

    @Override
    public List<Argo29> getFirst10Rows(){
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Argo29", Argo29.class);
        query.setMaxResults(10);
        List<Argo29> users = query.getResultList();
        return users;
    }
    @Override
    public List<Argo29> getSingleStudent(String sid) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Argo29 a WHERE a.spridenId=:sid", Argo29.class);
        query.setParameter("sid", sid);
        List<Argo29> resultList = query.getResultList();
        return resultList;
    }


    @Override
    public long count() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("SELECT count(a.id) FROM Argo29 a", Long.class);
        return (long) query.getSingleResult();
    }

    @Override
    public void removeAll() {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.createQuery("DELETE FROM Argo29")
                .executeUpdate();
    }

}
