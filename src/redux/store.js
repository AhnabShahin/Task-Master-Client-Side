// Create global store for all reducer
import { createStore } from "redux";
import rootReducer from './reducer/rootReducer';

const store = createStore(rootReducer);

export default store;