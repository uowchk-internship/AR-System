package com.example.arsystembackend.dao;

import com.example.arsystembackend.entity.source.Argo29;
import com.example.arsystembackend.entity.source.ProgramPlan;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
public class ProgramPlanDAOService implements ProgramPlanDAO {

    private EntityManager entityManager;

    @Autowired
    public ProgramPlanDAOService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void saveData(List<ProgramPlan> programPlanList) {
        Session currentSession = entityManager.unwrap(Session.class);
        for (ProgramPlan programPlan : programPlanList) {
            currentSession.saveOrUpdate(programPlan);
        }
    }

    @Override
    public List<ProgramPlan> getAll() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM ProgramPlan", ProgramPlan.class);
        List<ProgramPlan> programPlans = query.getResultList();
        return programPlans;
    }

    @Override
    public List<ProgramPlan> getFirst10Rows(String year) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM ProgramPlan p WHERE p.year = '" + year + "'", ProgramPlan.class);
        query.setMaxResults(10);
        List<ProgramPlan> programPlans = query.getResultList();
        return programPlans;
    }

    @Override
    public List<ProgramPlan> getSingleProgramPlan(String programName) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM ProgramPlan a WHERE a.program=:programName", ProgramPlan.class);
        query.setParameter("programName", programName);
        List<ProgramPlan> programPlans = query.getResultList();
        return programPlans;
    }


    @Override
    public long count() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("SELECT count(a.id) FROM ProgramPlan a", Long.class);
        return (long) query.getSingleResult();
    }

    @Override
    public long countOfYear(String year) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("SELECT count(a.id) FROM ProgramPlan a WHERE a.year = '" + year + "'", Long.class);
        return (long) query.getSingleResult();

    }

    @Override
    public void removeAll() {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.createQuery("DELETE FROM ProgramPlan")
                .executeUpdate();
    }

    @Override
    public void removeSingleYear(String year) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.createQuery("DELETE FROM ProgramPlan p WHERE p.year = '" + year + "'")
                .executeUpdate();

    }


}
