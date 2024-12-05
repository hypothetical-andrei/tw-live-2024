import combineReducers from './combiner'
import countReducer from './count-reducer'
import toggleReducer from './toggle-reducer'

export default combineReducers({
    counter: countReducer,
    toggler: toggleReducer
})