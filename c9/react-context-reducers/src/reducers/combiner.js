const combineReducers = (reducersWithInitialState) => {
    const reducers = Object.keys(reducersWithInitialState).reduce((acc, key) => {
        acc[key] = reducersWithInitialState[key].reducer;
        return acc;
    }, {});

    const initialState = Object.keys(reducersWithInitialState).reduce((acc, key) => {
        acc[key] = reducersWithInitialState[key].initialState;
        return acc;
    }, {});

    return {
        reducer: (state, action) => {
            return Object.keys(reducers).reduce((acc, key) => {
                acc[key] = reducers[key](state[key], action);
                return acc;
            }, {});
        },
        initialState,
    };
}

export default combineReducers