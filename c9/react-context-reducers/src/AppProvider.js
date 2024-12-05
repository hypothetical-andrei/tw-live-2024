import React, { useReducer } from 'react'
import combinedReducer from './reducers'
import  { AppDispatchContext, AppStateContext } from './context'

const AppProvider = ({ children }) => {
    const { reducer, initialState } = combinedReducer

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
};

export default AppProvider