const initialState = {
    toggled: false
}

const toggleReducer = {
    reducer: (state = initialState, action) => {
        switch (action.type) {
            case 'TOGGLE':
                return { toggled: !state.toggled };
            default:
                return state;
        }
    },
    initialState
} 

export default toggleReducer