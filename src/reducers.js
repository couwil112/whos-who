import { combineReducers } from 'redux'

import configReducer from './ducks/config.duck'

export default combineReducers({
  config: configReducer
})
