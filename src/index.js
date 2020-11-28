import React from 'react'
import ReactDOM from 'react-dom'
import App from './App-Redux2.js'
import store from './store'

import { Provider } from 'react-redux'

//<Provider><App /></Provider>
ReactDOM.render(<Provider store={store}><App /></Provider>,document.getElementById('root'))
