import {  solutionMenu } from "../../home/menu";
import * as types from "../actions/actionTypes";
const initialState = solutionMenu;
const solutionActiveMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SOLUTION_ACTIVE_MENU:
            return action.payload
        default:
            return state;
    }
}
export default solutionActiveMenuReducer;