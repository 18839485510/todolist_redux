import React,{Component} from 'react'
import axios from 'axios'
import regeneratorRuntime from 'regenerator-runtime'


import store from './store'
import {getLoadDateAction,getChangeItemAction,getAddItemAction,getDelItemAction} from './store/actionCreator'

//import 'antd/dist/antd.css';//引入所有的css

import AppUI from './AppUI'

class App extends Component{
    constructor(props){
        super(props)
        
        this.state = store.getState()
        
        store.subscribe(()=>{
            this.setState(store.getState())
        })
        
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
    }
    
    handleChange(ev){

      //store.dispatch({type:'CHANGE_ITEM',payload:ev.target.value})
      store.dispatch(getChangeItemAction(ev.target.value))

    }
    
    handleSubmit(){

       //store.dispatch({type:'ADD_ITEM',payload:Date.now()})
       store.dispatch(getAddItemAction(Date.now()))

    }
    handleRemove(id){

       //store.dispatch({type:'DEL_ITEM',payload:id})
       store.dispatch(getDelItemAction(id))

    }
    async componentDidMount(){
      //const result = await axios.get('http://127.0.0.1:3000')
      store.dispatch(getLoadDateAction())

    }
    render(){
      const {list,task,handleChange,handleSubmit,handleRemove} = this.props
        return (
          <AppUI handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleRemove={this.handleRemove} task={this.state.task} list={this.state.list} />
        )
    }
}
export default App