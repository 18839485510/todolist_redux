import React,{Component} from 'react'
import axios from 'axios'
import regeneratorRuntime from 'regenerator-runtime'
import {Input,Row, Col,Button,List,Image} from 'antd'

import {createStore} from 'redux'

//import 'antd/dist/antd.css';//引入所有的css
import './index.css'

//定义一个初始化的state
const defaultState = { list: [], task: '' }

function reducer(state = defaultState, action){
    let newState = JSON.parse(JSON.stringify(state))
    
    if (action.type == 'LOAD_DATA'){
        //初始化加载网络数据
        newState.list = action.payload
    }
    if (action.type == 'CHANGE_ITEM'){
        //改变输入框中的数据
        newState.task = action.payload
    }
    if (action.type == 'ADD_ITEM'){
        //往list中添加输入框中数据
        const item = {
            id:action.payload,
            task:newState.task
        }
        newState.task = ''
        newState.list.push(item)
    }
    if (action.type == 'DEL_ITEM'){
        //删除list中的某一条数据
        const list = newState.list.filter(item=>action.payload!=item.id)
        newState.list = list
    }
    return newState
}

//创建一个Store
const store = createStore(reducer)


class App extends Component{
    constructor(props){
        super(props)

        /*
        this.state={
            list:[],
            task:''
        }
        */
        
        this.state = store.getState()
        
        store.subscribe(()=>{
            this.setState(store.getState())
        })

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(ev){
        /*
       this.setState({
           task:ev.target.value
       })
       */
      store.dispatch({type:'CHANGE_ITEM',payload:ev.target.value})
    }
    handleSubmit(){
        /*
        const list = [...this.state.list]
        list.push({
            id:Date.now(),
            task:this.state.task
        })
        this.setState({
            list,
            task:''
        })
        */
       store.dispatch({type:'ADD_ITEM',payload:Date.now()})
    }
    handleRemove(id){
        /*
        const list = this.state.list.filter(item=>id!=item.id)
        this.setState({
            list
        })
        */
       store.dispatch({type:'DEL_ITEM',payload:id})
    }
    async componentDidMount(){
        /*
         axios.get('http://127.0.0.1:3000')
         .then(result=>{
             console.log(result)
         })
        */
       const result = await axios.get('http://127.0.0.1:3000')
       /*
       this.setState({
         list:result.data
       })
       */
      store.dispatch({ type: 'LOAD_DATA', payload: result.data})
    }
    render(){
    //const items = this.state.list.map(item=><li key={item.id} className="item" onClick={this.handleRemove.bind(this,item.id) }>{item.task}</li>)
        return (
            <div className="App">
                 <Row><Col span={18}><Input onChange={this.handleChange} value={this.state.task} /></Col><Col span={6}><Button type="primary" onClick={this.handleSubmit}>提交</Button></Col></Row>
                 <List 
                 style={{marginTop:30+'px'}}
                 bordered
                 dataSource={this.state.list}
                 renderItem={item => (
                    <List.Item onClick={this.handleRemove.bind(this,item.id)}>
                       {item.task}
                    </List.Item>
                  )}
                  />
            </div>
        )
    }
}
export default App