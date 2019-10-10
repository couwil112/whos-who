import { combineReducers } from 'redux'

import configReducer from './ducks/config.duck'
import gameReducer from './ducks/game.duck'

export default combineReducers({
  config: configReducer,
  game: gameReducer
})
