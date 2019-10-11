import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import configureStore from './configureStore'
import { fetchAndStoreAccessToken } from './services/auth'
import App from './App'

// Fetch and store the Spotify access token in localStorage
fetchAndStoreAccessToken()

const store = configureStore()

const MOUNT_NODE = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  MOUNT_NODE
)
