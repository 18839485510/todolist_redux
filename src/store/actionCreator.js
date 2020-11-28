import { LOAD_DATA, CHANGE_ITEM, ADD_ITEM, DEL_ITEM } from './actionType.js'
import axios from 'axios'
import regeneratorRuntime from 'regenerator-runtime'

export function getChangeItemAction(payload) {
    return ({
        type: CHANGE_ITEM,
        payload: payload
    })
}
export function getAddItemAction(payload) {
    return ({
        type: ADD_ITEM,
        payload: payload
    })
}
export function getDelItemAction(payload) {
    return ({
        type: DEL_ITEM,
        payload: payload
    })
}
export const getLoadDateAction=()=>{
    return async function(dispatch){
       const result = await axios.get('http://127.0.0.1:3000')
       dispatch ({
        type: LOAD_DATA,
        payload: result.data
    })
    }
}