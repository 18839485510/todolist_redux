import { LOAD_DATA, CHANGE_ITEM, ADD_ITEM, DEL_ITEM } from './actionType'

//定义一个初始化的state
const defaultState = { list: [], task: '' }

function reducer(state = defaultState, action){
    let newState = JSON.parse(JSON.stringify(state))
    
    if (action.type == LOAD_DATA){
        //初始化加载网络数据
        newState.list = action.payload
    }
    if (action.type == CHANGE_ITEM){
        //改变输入框中的数据
        newState.task = action.payload
    }
    if (action.type == ADD_ITEM){
        //往list中添加输入框中数据
        const item = {
            id:action.payload,
            task:newState.task
        }
        newState.task = ''
        newState.list.push(item)
    }
    if (action.type == DEL_ITEM){
        //删除list中的某一条数据
        const list = newState.list.filter(item=>action.payload!=item.id)
        newState.list = list
    }
    return newState
}

export default reducer