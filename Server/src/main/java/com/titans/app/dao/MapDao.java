package com.titans.app.dao;

import com.titans.app.entity.State;
import com.titans.app.enums.StateEnum;

public interface MapDao {
    State getState(StateEnum state);
}
