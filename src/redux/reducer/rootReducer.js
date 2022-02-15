// Combine ALL Reducers

import { combineReducers } from "redux";
import activeMenuReducer from './activeMenuReducer';
import solutionActiveMenuReducer from './solutionActiveMenuReducer';

const rootReducer= combineReducers({
    activeMenuReducer,
    solutionActiveMenuReducer,
})
export default rootReducer;  