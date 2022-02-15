// All actions
import * as types from './actionTypes';

export const activeMenuAction= (data) => {
    return {
        type: types.ACTIVEMENU,
        payload: data,
    }
}
export const solutionActiveMenuAction= (data) => {
    return {
        type: types.SOLUTION_ACTIVE_MENU,
        payload: data,
    }
}

