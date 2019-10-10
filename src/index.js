import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
// import { createGlobalStyle } from 'styled-components'

import configureStore from './configureStore'
import { fetchAndStoreAccessToken } from './services/auth'
import App from './App'

// const GlobalStyle = createGlobalStyle`
//     body {
//         margin: 0;
//         font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
//             "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
//             sans-serif;
//         -webkit-font-smoothing: antialiased;
//         -moz-osx-font-smoothing: grayscale;
//         background-color: #FAEBD7;
//     }

//     code {
//         font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
//     }
// `

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
