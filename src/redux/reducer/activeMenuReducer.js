import { menu } from "../../home/menu";
import * as types from "../actions/actionTypes";
const initialState = menu;
const activeMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ACTIVEMENU:
            return action.payload
        default:
            return state;
    }
}
export default activeMenuReducer;