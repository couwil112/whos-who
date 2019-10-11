import React from 'react'
import { Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './containers/Home'
import Game from './containers/Game'

const App = props => (
  <div>
    <Route path='/' component={Header} />
    <Route exact path='/' component={Home} />
    <Route exact path='/game' component={Game} />
  </div>
)

export default App
