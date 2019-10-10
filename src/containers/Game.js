import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  loadArtists,
  loadSongs,
  selectArtist,
  selectSong
} from '../ducks/game.duck'

// import Header from '../components/Header'
class Game extends React.Component {
  componentDidMount () {
    Promise.all([this.props.loadArtists(), this.props.loadSongs()])
  }

  render () {
    // const artists = this.props.artists.map()
    return (
      <div>
        {/* <Header name='Guess The Artist' /> */}
        <button onClick={event => console.log('Play Song')}>Play Song</button>
      </div>
    )
  }
}

Game.propTypes = {
  loadArtists: PropTypes.func.isRequired,
  loadSongs: PropTypes.func.isRequired
  // artists: PropTypes.array,
  // songs: PropTypes.array,
  // selectArtist: PropTypes.func.isRequired,
  // selectSong: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  artists: state.config.artists,
  songs: state.config.songs
})

const mapDispatchToProps = dispatch => ({
  loadArtists: () => dispatch(loadArtists()),
  loadSongs: () => dispatch(loadSongs()),
  selectArtist: artist => dispatch(selectArtist(artist)),
  selectSong: song => dispatch(selectSong(song))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
