import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import Header from './components/Header'
import Home from './containers/Home'
import Game from './containers/Game'

const Div = styled.div`
  /* background-color: #faebd7; */
`

const App = props => (
  <Div>
    <Route path='/' component={Header} />
    <Route exact path='/' component={Home} />
    <Route exact path='/game' component={Game} />
  </Div>
)

export default App
