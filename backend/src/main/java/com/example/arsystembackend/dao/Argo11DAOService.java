package com.example.arsystembackend.dao;

import com.example.arsystembackend.entity.source.Argo11;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository
public class Argo11DAOService implements Argo11DAO {
    private EntityManager entityManager;

    @Autowired
    public Argo11DAOService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void saveData(List<Argo11> argo11List) {
        Session currentSession = entityManager.unwrap(Session.class);
        for (Argo11 argo11 : argo11List) {
            currentSession.saveOrUpdate(argo11);
        }
    }

    @Override
    public List<Argo11> getAll() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Argo11", Argo11.class);
        List<Argo11> users = query.getResultList();
        return users;
    }

    @Override
    public List<Argo11> getByIdList(List<String> idList) {
        Session currentSession = entityManager.unwrap(Session.class);
        List<Argo11> resultList = new ArrayList<>();
        for (String id : idList) {
            Query query = currentSession.createQuery("FROM Argo11 a WHERE a.studentId=:sid", Argo11.class);
            query.setParameter("sid", id);
            resultList.add((Argo11) query.getSingleResult());
        }

        return resultList;
    }

    @Override
    public List<String> getAllPrograms() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("SELECT DISTINCT concat(a.progCode,' (',a.programmeTitle,')') AS title FROM Argo11 a ORDER BY 'title'", String.class);
        List<String> programs = query.getResultList();
        return programs;
    }

    @Override
    public List<String> getProgramsByDepartment(String department) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("SELECT DISTINCT concat(a.progCode,' (',a.programmeTitle,')') AS title FROM Argo11 a WHERE a.deptCode = '" + department + "' ORDER BY 'title'", String.class);
        List<String> programs = query.getResultList();
        return programs;
    }


    @Override
    public List<Argo11> getFirst10Rows() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Argo11", Argo11.class);
        query.setMaxResults(10);
        List<Argo11> users = query.getResultList();
        return users;
    }

    @Override
    public Argo11 getSingleStudent(String sid) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM Argo11 a WHERE a.studentId=:sid", Argo11.class);
        query.setParameter("sid", sid);
        Argo11 argo11 = (Argo11) query.getSingleResult();
        return argo11;
    }

    @Override
    public long count() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("SELECT count(a.id) FROM Argo11 a", Long.class);
        return (long) query.getSingleResult();
    }

    @Override
    public void removeAll() {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.createQuery("DELETE FROM Argo11")
                .executeUpdate();
    }

}
