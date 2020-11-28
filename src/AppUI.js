import React from 'react'
import {Input,Row, Col,Button,List,Image} from 'antd'
import './index.css'

const AppUI =(props)=> {
   let {handleChange,handleRemove,handleSubmit,task,list} = props
   return (
             <div className="App">
               <Row><Col span={18}><Input onChange={handleChange} value={task} /></Col><Col span={6}><Button type="primary" onClick={handleSubmit}>提交</Button></Col></Row>
               <List 
                 style={{marginTop:30+'px'}}
                 bordered
                 dataSource={list}
                 renderItem={item => (
               <List.Item onClick={()=>{handleRemove(item.id)}}>
                 {item.task}
               </List.Item>
              )}
                />
             </div>
          )

}
   

export default AppUI
