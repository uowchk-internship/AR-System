package com.example.arsystembackend.dao;

import com.example.arsystembackend.entity.source.Argo10;
import com.example.arsystembackend.entity.source.Argo11;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
public class Argo10DAOService implements Argo10DAO{
    private EntityManager entityManager;

    @Autowired
    public Argo10DAOService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void saveData(List<Argo10> argo10List) {
        Session currentSession = entityManager.unwrap(Session.class);
        for (Argo10 argo10:argo10List){
            currentSession.saveOrUpdate(argo10);
        }
    }

    @Override
    public List<Argo10> getAll() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Argo10", Argo10.class);
        List<Argo10> users = query.getResultList();
        return users;
    }

    @Override
    public List<Argo10> getFirst10Rows(){
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Argo10", Argo10.class);
        query.setMaxResults(10);
        List<Argo10> users = query.getResultList();
        return users;
    }
    @Override
    public List<Argo10> getSingleStudent(String sid) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Argo10 a WHERE a.studentId=:sid", Argo10.class);
        query.setParameter("sid", sid);
        List<Argo10> resultList = query.getResultList();
        return resultList;
    }


    @Override
    public long count() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("SELECT count(a.id) FROM Argo10 a", Long.class);
        return (long) query.getSingleResult();
    }

    @Override
    public List<String> getAllEnrolledTerms() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("SELECT DISTINCT a.shrtcknTermCode FROM Argo10 a " +
                "ORDER BY a.shrtcknTermCode", String.class);
        List<String> terms = query.getResultList();
        System.out.println(terms);
        return terms;
    }

    @Override
    public void removeAll() {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.createQuery("DELETE FROM Argo10")
                .executeUpdate();
    }
}
