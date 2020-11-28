import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getLoadDateAction,getChangeItemAction,getAddItemAction,getDelItemAction} from './store/actionCreator'

//import 'antd/dist/antd.css';//引入所有的css

import AppUI from './AppUI'

class App extends Component{
    constructor(props){
        super(props)
    }
   async componentDidMount(){
     this.props.handleLoadDate()
  }
    render(){
      const {list,task,handleChange,handleSubmit,handleRemove} = this.props
        return (
          <AppUI handleChange={handleChange} handleSubmit={handleSubmit} handleRemove={handleRemove} task={task} list={list} />
        )
    }
}

//映射属性函数
//1、该函数作为connect函数的第一个参数
//2、函数的返回值映射到建立连接的组件中的props中
//3、该函数接受的第一个参数为store中的最新的state
//4、该函数会在connec函数被调用时被调用一次进行数据初始化，然后在state发生变化时会被调用

const mapStateToProps=(state)=>{
 console.log('mapStateToProps',state)
 return {
     list:state.list,
     task:state.task
 }
}

//映射方法函数
//1、该函数作为connect方法的第二个参数
//2、该函数的返回值映射到建立连接的组件中的props中

const mapDispatchToProps=(dispatch)=>{
    return {
      handleChange:(ev)=>{
        dispatch(getChangeItemAction(ev.target.value))
      },
      handleSubmit:()=>{
        dispatch(getAddItemAction(Date.now()))
      },
      handleRemove:(id)=>{
       dispatch(getDelItemAction(id))
      },
      handleLoadDate:()=>{
      dispatch(getLoadDateAction())
      }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App)