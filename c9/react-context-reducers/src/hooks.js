import { useContext } from 'react'
import { AppDispatchContext, AppStateContext } from './context'

export const useAppState = () => {
    const context = useContext(AppStateContext)
    if (context === undefined) {
        throw new Error('useAppState must be used within an AppProvider');
    }
    return context
}

export const useAppDispatch = () => {
    const context = useContext(AppDispatchContext)
    if (context === undefined) {
        throw new Error('useAppDispatch must be used within an AppProvider');
    }
    return context
};
