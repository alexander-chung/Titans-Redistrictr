package com.titans.app.dao;

import com.titans.app.entity.State;
import com.titans.app.enums.StateEnum;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Repository
@Transactional
public class MapDaoImpl implements MapDao {

    private EntityManager entityManager;
    @PersistenceContext
    public void setEntityManager(EntityManager em) {
        this.entityManager = em;
    }

    @Override
    public State getState(StateEnum state) {
        return entityManager.find(State.class, state);
    }
}
