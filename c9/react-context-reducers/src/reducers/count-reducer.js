const initialState = { count: 0 }

const counterReducer = {
    reducer: (state = initialState, action) => {
        switch (action.type) {
            case 'INCREMENT':
                return { count: state.count + 1 }
            case 'DECREMENT':
                return { count: state.count - 1 }
            default:
                return state
        }
    },
    initialState
}

export default counterReducer